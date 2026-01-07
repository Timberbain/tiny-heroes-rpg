'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getCharacter } from '@/lib/characters';
import { CharacterId, AdventureSetting, AdventureLength } from '@/lib/types';

function SetupAdventureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characterId = searchParams.get('character') as CharacterId | null;

  const [characterName, setCharacterName] = useState('');
  const [adventureSetting, setAdventureSetting] =
    useState<AdventureSetting>('fantasy');
  const [adventureLength, setAdventureLength] =
    useState<AdventureLength>('short');
  const [adventureInspiration, setAdventureInspiration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if no character selected
  useEffect(() => {
    if (!characterId) {
      router.push('/select-character');
    }
  }, [characterId, router]);

  if (!characterId) {
    return null;
  }

  const character = getCharacter(characterId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!characterName.trim()) {
      alert('Please give your hero a name!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create session via API
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId,
          characterName: characterName.trim(),
          adventureSetting,
          adventureLength,
          adventureInspiration: adventureInspiration.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const data = await response.json();

      // Save session ID to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tiny-heroes-session-id', data.sessionId);
      }

      // Navigate to play page with session ID in URL
      router.push(`/play/${data.sessionId}`);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Oops! Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-parchment to-parchment-dark p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 rounded-3xl border-4 border-border-dark bg-cloud p-6 text-center shadow-xl md:p-8">
          <h1 className="mb-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl">
            Setup Your Adventure! 🎮
          </h1>
          <p className="font-body text-lg text-text-secondary md:text-xl">
            Tell us about your hero and the kind of adventure you want to go on!
          </p>
        </div>

        {/* Selected Character Display */}
        <div className="mb-8 rounded-3xl border-5 border-border-dark bg-linear-to-br from-parchment to-parchment-dark p-6 shadow-lg md:p-8">
          <h2 className="mb-4 text-center font-heading text-xl font-bold text-text-primary md:text-2xl">
            Your Hero
          </h2>
          <div className="flex items-center gap-4 rounded-2xl border-4 border-border-dark bg-cloud p-4 md:gap-6 md:p-6">
            <div
              className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-4 bg-cloud md:h-24 md:w-24"
              style={{ borderColor: character.color }}
            >
              <Image
                src={character.iconUrl}
                alt={character.displayName}
                width={96}
                height={96}
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div>
              <h3
                className="mb-1 font-heading text-2xl font-bold md:text-3xl"
                style={{ color: character.color }}
              >
                {character.displayName}
              </h3>
              <p className="font-body text-base text-text-secondary md:text-lg">
                {character.archetype}
              </p>
            </div>
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Character Name */}
          <div className="rounded-2xl border-4 border-border-dark bg-cloud p-6 shadow-md md:p-8">
            <label className="mb-3 block">
              <span className="mb-2 block font-heading text-xl font-bold text-text-primary md:text-2xl">
                What&apos;s your hero&apos;s name? ✨
              </span>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="Enter a brave name..."
                maxLength={30}
                className="min-h-[64px] w-full rounded-xl border-3 border-border-dark bg-white px-5 py-4 font-body text-lg shadow-inner transition-all duration-200 placeholder:text-text-light focus:border-adventure-blue focus:outline-none focus:ring-4 focus:ring-adventure-blue/20 md:text-xl"
                required
              />
            </label>
          </div>

          {/* Adventure Setting */}
          <div className="rounded-2xl border-4 border-border-dark bg-cloud p-6 shadow-md md:p-8">
            <label className="mb-3 block">
              <span className="mb-2 block font-heading text-xl font-bold text-text-primary md:text-2xl">
                What kind of adventure? 🌍
              </span>
              <select
                value={adventureSetting}
                onChange={(e) =>
                  setAdventureSetting(e.target.value as AdventureSetting)
                }
                className="min-h-[64px] w-full cursor-pointer appearance-none rounded-xl border-3 border-border-dark bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMUw2IDZMMTEgMSIgc3Ryb2tlPSIjM0QyRTFGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==')] bg-size-[12px_8px] bg-position-[right_1.25rem_center] bg-no-repeat px-5 py-4 pr-12 font-body text-lg shadow-inner transition-all duration-200 focus:border-adventure-blue focus:outline-none focus:ring-4 focus:ring-adventure-blue/20 md:text-xl"
              >
                <option value="fantasy">
                  Fantasy (castles, dragons, magic!)
                </option>
                <option value="sci-fi">
                  Space Adventure (rockets, aliens, planets!)
                </option>
                <option value="horror">
                  Silly Spooky (friendly monsters, not scary!)
                </option>
                <option value="custom">Surprise Me!</option>
              </select>
            </label>
          </div>

          {/* Adventure Length */}
          <div className="rounded-2xl border-4 border-border-dark bg-cloud p-6 shadow-md md:p-8">
            <span className="mb-4 block font-heading text-xl font-bold text-text-primary md:text-2xl">
              How long should the adventure be? ⏰
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setAdventureLength('short')}
                className={`min-h-[64px] rounded-xl border-4 border-border-dark px-6 py-4 font-heading text-lg font-bold shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-1 md:text-xl ${
                  adventureLength === 'short'
                    ? 'bg-adventure-blue text-white ring-4 ring-adventure-blue/30'
                    : 'bg-white text-text-primary'
                } `}
              >
                Short (5-10 minutes)
              </button>
              <button
                type="button"
                onClick={() => setAdventureLength('long')}
                className={`min-h-[64px] rounded-xl border-4 border-border-dark px-6 py-4 font-heading text-lg font-bold shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-1 md:text-xl ${
                  adventureLength === 'long'
                    ? 'bg-adventure-blue text-white ring-4 ring-adventure-blue/30'
                    : 'bg-white text-text-primary'
                } `}
              >
                Long (15-20 minutes)
              </button>
            </div>
          </div>

          {/* Adventure Inspiration (Optional) */}
          <div className="rounded-2xl border-4 border-border-dark bg-cloud p-6 shadow-md md:p-8">
            <label className="mb-3 block">
              <span className="mb-2 block font-heading text-xl font-bold text-text-primary md:text-2xl">
                Any ideas for the story? (Optional) 💭
              </span>
              <textarea
                value={adventureInspiration}
                onChange={(e) => setAdventureInspiration(e.target.value)}
                placeholder="Tell us what you'd like to happen... (a lost kitten, a hidden treasure, etc.)"
                rows={4}
                maxLength={200}
                className="w-full resize-none rounded-xl border-3 border-border-dark bg-white px-5 py-4 font-body text-base shadow-inner transition-all duration-200 placeholder:text-text-light focus:border-adventure-blue focus:outline-none focus:ring-4 focus:ring-adventure-blue/20 md:text-lg"
              />
              <span className="mt-1 block font-body text-sm text-text-secondary">
                {adventureInspiration.length}/200 characters
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-[64px] w-full rounded-2xl border-4 border-border-dark bg-adventure-green px-12 py-5 font-heading text-xl font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-1 active:shadow-pressed disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto md:text-2xl"
            >
              {isSubmitting ? 'Starting Adventure...' : 'Start Adventure! 🚀'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/select-character')}
              className="w-full rounded-xl border-3 border-border-medium bg-cloud px-8 py-4 font-body text-lg font-semibold text-text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-auto"
            >
              ← Change Hero
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function SetupAdventure() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-parchment">
          <div className="font-heading text-2xl text-text-primary">
            Loading...
          </div>
        </div>
      }
    >
      <SetupAdventureContent />
    </Suspense>
  );
}
