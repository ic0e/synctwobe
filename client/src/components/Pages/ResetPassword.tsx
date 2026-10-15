import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) setError(error.message)
    else setMessage('Check your email for a reset link.')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col gap-3 p-8">
        <h1 className="text-[22px] font-medium tracking-tight mb-2">Reset password</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-neutral-950 border border-neutral-800 rounded-[10px] px-3.5 py-3 text-sm outline-none focus:border-neutral-600 transition-colors"
        />
        {error && <p className="text-red-500 text-[13px]">{error}</p>}
        {message && <p className="text-neutral-500 text-[13px]">{message}</p>}
        <button
          type="submit"
          className="bg-white text-black rounded-[10px] py-3 text-sm font-medium hover:opacity-85 transition-opacity"
        >
          Send reset link
        </button>
        <div className="flex justify-between text-[13px] mt-1">
          <Link to="/signin" className="text-neutral-500 hover:text-white transition-colors">Back to sign in</Link>
        </div>
      </form>
    </div>
  )
}
