import { createClient } from 'npm:@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const bucket = 'order-images'

const supabase = createClient(supabaseUrl, serviceRoleKey)

interface ExpiredOrderImageRow {
  id: string
  storage_path: string
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function markRowDeleted(id: string) {
  const response = await supabase
    .from('order_images')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .is('deleted_at', null)

  if (response.error) {
    throw response.error
  }
}

async function fetchExpiredRows() {
  const response = await supabase
    .from('order_images')
    .select('id, storage_path')
    .is('deleted_at', null)
    .not('delete_after', 'is', null)
    .lte('delete_after', new Date().toISOString())
    .limit(50)

  if (response.error) {
    throw response.error
  }

  return (response.data || []) as ExpiredOrderImageRow[]
}

async function removeImage(row: ExpiredOrderImageRow) {
  const storage = await supabase.storage.from(bucket).remove([row.storage_path])

  if (storage.error) {
    throw storage.error
  }

  await markRowDeleted(row.id)
}

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method Not Allowed' }, 405)
  }

  try {
    const rows = await fetchExpiredRows()

    for (const row of rows) {
      await removeImage(row)
    }

    return json({ processed: rows.length })
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      500,
    )
  }
})
