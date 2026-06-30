import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { AppShell } from '../components/ui/app-shell'
import { BottomNav } from '../components/ui/bottom-nav'
import { TopBar } from '../components/ui/top-bar'

export function MobileAppLayout() {
  return (
    <AppShell>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
        <TopBar />
        <motion.main
          id="main-content"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 rounded-[32px] border border-white/10 bg-slate-900/55 p-5 shadow-2xl backdrop-blur-xl"
        >
          <Outlet />
        </motion.main>
        <BottomNav />
      </div>
    </AppShell>
  )
}
