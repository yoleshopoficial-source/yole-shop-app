import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  recoverySchema,
  signInSchema,
  signUpSchema,
} from '../lib/zod-schemas'
import type {
  RecoveryFormValues,
  SignInFormValues,
  SignUpFormValues,
} from '../types/auth'

export function useSignInForm() {
  return useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  })
}

export function useSignUpForm() {
  return useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  })
}

export function useRecoveryForm() {
  return useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
    defaultValues: { email: '' },
  })
}
