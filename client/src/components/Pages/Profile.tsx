import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../supabase'

export default function Profile() {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <Navigate to="/signin" replace />

  const initial = session.user.email?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[340px] flex flex-col items-center p-8 border border-neutral-800 rounded-xl bg-neutral-950">
        
        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl font-medium mb-4">
          {initial}
        </div>
        
        <h1 className="text-[22px] font-medium tracking-tight mb-6">Profile</h1>
        
        <div className="w-full flex flex-col gap-3 text-[13px] mb-6">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <span className="text-neutral-500">Email</span>
            <span className="truncate ml-4">{session.user.email}</span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
            <span className="text-neutral-500">User ID</span>
            <span className="truncate ml-4 text-neutral-400">{session.user.id.split('-')[0]}...</span>
          </div>
        </div>

        <button
          onClick={() => supabase.auth.signOut()}
          className="w-full bg-white text-black rounded-[10px] py-3 text-sm font-medium hover:opacity-85 transition-opacity"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
