import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect, type FormEvent } from 'react'
import { supabase } from '../../supabase'

export default function Profile() {
  const { session, loading } = useAuth()
  const [displayName, setDisplayName] = useState('')
  const [savedName, setSavedName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [savedAvatarUrl, setSavedAvatarUrl] = useState('')
  const [isEditingPfp, setIsEditingPfp] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!session) return

    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', session?.user.id)
        .single();

      if (data && !error) {
        setDisplayName(data.display_name || '');
        setSavedName(data.display_name || '');
        setAvatarUrl(data.avatar_url || '');
        setSavedAvatarUrl(data.avatar_url || '');
      }
    }
    
    fetchProfile()
  }, [session])
  
  async function handleSave(e: FormEvent) {
    e.preventDefault()
    if (!session) return
    setIsSaving(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: session.user.id, 
        display_name: displayName,
        avatar_url: avatarUrl
      })

    if (error) {
      alert(error.message)
    } else {
      setSavedName(displayName)
      setSavedAvatarUrl(avatarUrl)
      setIsEditingPfp(false)
    }
    setIsSaving(false)
  }

  if (loading) return null
  if (!session) return <Navigate to="/signin" replace />

  const initial = session.user.email?.charAt(0).toUpperCase() || 'U'

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-[340px] flex flex-col items-center p-8 border border-neutral-800 rounded-xl bg-neutral-950">
        
        <div 
          onClick={() => setIsEditingPfp(!isEditingPfp)}
          className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl font-medium mb-4 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
        >
          {savedAvatarUrl ? (
            <img src={savedAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </div>

        {isEditingPfp && (
          <input
            type="url"
            placeholder="Paste image URL"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-[10px] px-3.5 py-3 text-sm outline-none focus:border-neutral-600 transition-colors mb-4"
          />
        )}
        
        <h1 className="text-[22px] font-medium tracking-tight mb-6">
          {savedName || 'No display name'}
        </h1>
        
        <form onSubmit={handleSave} className="w-full flex flex-col gap-3 mb-6">
          <input
            type="text"
            placeholder="Set display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded-[10px] px-3.5 py-3 text-sm outline-none focus:border-neutral-600 transition-colors"
          />
          <button
            type="submit"
            disabled={isSaving || (displayName === savedName && avatarUrl === savedAvatarUrl)}
            className="bg-white text-black rounded-[10px] py-2.5 text-sm font-medium hover:opacity-85 transition-opacity disabled:opacity-40"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </form>

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
          className="w-full text-neutral-500 hover:text-white text-[13px] transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
