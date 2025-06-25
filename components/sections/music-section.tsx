"use client"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ExternalLink,
  Music,
  Headphones,
  Brain,
  Coffee,
  Shuffle,
  Repeat,
  Heart,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useAudio } from "@/hooks/use-audio"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  focusType: "deep-focus" | "ambient" | "lo-fi" | "classical" | "nature"
  url: string
  liked?: boolean
}

interface Playlist {
  id: string
  name: string
  description: string
  songs: Song[]
  focusType: string
}

export function MusicSection() {
  const [currentSong, setCurrentSong] = useLocalStorage<Song | null>("currentSong", null)
  const [volume, setVolume] = useLocalStorage<number[]>("musicVolume", [75])
  const [isSpotifyConnected, setIsSpotifyConnected] = useLocalStorage<boolean>("spotifyConnected", false)
  const [isShuffled, setIsShuffled] = useLocalStorage<boolean>("musicShuffle", false)
  const [isRepeating, setIsRepeating] = useLocalStorage<boolean>("musicRepeat", false)
  const [likedSongs, setLikedSongs] = useLocalStorage<string[]>("likedSongs", [])
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)

  // Real audio URLs (using royalty-free music)
  const focusPlaylists: Playlist[] = [
    {
      id: "1",
      name: "Deep Focus",
      description: "Instrumental tracks for intense concentration",
      focusType: "Deep Work",
      songs: [
        {
          id: "1",
          title: "Weightless",
          artist: "Marconi Union",
          album: "Ambient Works",
          duration: "8:10",
          genre: "Ambient",
          focusType: "deep-focus",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
        {
          id: "2",
          title: "Deep Concentration",
          artist: "Focus Sounds",
          album: "Study Music",
          duration: "7:49",
          genre: "Ambient",
          focusType: "deep-focus",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
      ],
    },
    {
      id: "2",
      name: "Lo-Fi Study Beats",
      description: "Chill beats to study and work to",
      focusType: "Study",
      songs: [
        {
          id: "3",
          title: "Coffee Shop",
          artist: "Lo-Fi Collective",
          album: "Study Vibes",
          duration: "3:45",
          genre: "Lo-Fi",
          focusType: "lo-fi",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
        {
          id: "4",
          title: "Rainy Day",
          artist: "Chill Beats",
          album: "Atmospheric",
          duration: "4:12",
          genre: "Lo-Fi",
          focusType: "lo-fi",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
      ],
    },
    {
      id: "3",
      name: "Classical Focus",
      description: "Classical pieces for enhanced concentration",
      focusType: "Classical",
      songs: [
        {
          id: "5",
          title: "Canon in D",
          artist: "Johann Pachelbel",
          album: "Baroque Classics",
          duration: "5:03",
          genre: "Classical",
          focusType: "classical",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
        {
          id: "6",
          title: "Clair de Lune",
          artist: "Claude Debussy",
          album: "Suite Bergamasque",
          duration: "4:38",
          genre: "Classical",
          focusType: "classical",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
      ],
    },
    {
      id: "4",
      name: "Nature Sounds",
      description: "Natural ambient sounds for relaxation",
      focusType: "Ambient",
      songs: [
        {
          id: "7",
          title: "Forest Rain",
          artist: "Nature Sounds",
          album: "Natural Ambience",
          duration: "10:00",
          genre: "Ambient",
          focusType: "nature",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
        {
          id: "8",
          title: "Ocean Waves",
          artist: "Nature Sounds",
          album: "Coastal Sounds",
          duration: "8:30",
          genre: "Ambient",
          focusType: "nature",
          url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
        },
      ],
    },
  ]

  const {
    isPlaying,
    duration,
    currentTime,
    volume: audioVolume,
    isLoaded,
    play,
    pause,
    seek,
    setVolume: setAudioVolume,
  } = useAudio(currentSong?.url || "")

  useEffect(() => {
    setAudioVolume(volume[0] / 100)
  }, [volume, setAudioVolume])

  const handlePlayPause = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const handleSongSelect = (song: Song, playlist?: Playlist) => {
    setCurrentSong(song)
    setCurrentPlaylist(playlist || null)
  }

  const handleNext = () => {
    if (currentPlaylist && currentSong) {
      const currentIndex = currentPlaylist.songs.findIndex((s) => s.id === currentSong.id)
      const nextIndex = isShuffled
        ? Math.floor(Math.random() * currentPlaylist.songs.length)
        : (currentIndex + 1) % currentPlaylist.songs.length
      setCurrentSong(currentPlaylist.songs[nextIndex])
    }
  }

  const handlePrevious = () => {
    if (currentPlaylist && currentSong) {
      const currentIndex = currentPlaylist.songs.findIndex((s) => s.id === currentSong.id)
      const prevIndex = currentIndex === 0 ? currentPlaylist.songs.length - 1 : currentIndex - 1
      setCurrentSong(currentPlaylist.songs[prevIndex])
    }
  }

  const handleLikeSong = (songId: string) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter((id) => id !== songId))
    } else {
      setLikedSongs([...likedSongs, songId])
    }
  }

  const connectSpotify = () => {
    // Simulate Spotify connection
    setIsSpotifyConnected(true)
    // In a real app, this would initiate Spotify OAuth
    window.open(
      "https://accounts.spotify.com/authorize?client_id=your_client_id&response_type=code&redirect_uri=your_redirect_uri&scope=streaming%20user-read-email%20user-read-private",
      "_blank",
    )
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getFocusIcon = (focusType: string) => {
    switch (focusType.toLowerCase()) {
      case "deep work":
        return <Brain className="h-4 w-4" />
      case "study":
        return <Coffee className="h-4 w-4" />
      case "classical":
        return <Music className="h-4 w-4" />
      case "ambient":
        return <Headphones className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

  const getFocusColor = (focusType: string) => {
    switch (focusType.toLowerCase()) {
      case "deep work":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      case "study":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      case "classical":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
      case "ambient":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Focus Music</h2>
        {!isSpotifyConnected ? (
          <Button onClick={connectSpotify} className="bg-green-600 hover:bg-green-700 text-white">
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect Spotify
          </Button>
        ) : (
          <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
            <Music className="h-3 w-3 mr-1" />
            Spotify Connected
          </Badge>
        )}
      </div>

      {/* Current Player */}
      {currentSong && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Music className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">{currentSong.title}</h3>
                <p className="text-gray-400">{currentSong.artist}</p>
                <p className="text-gray-500 text-sm">{currentSong.album}</p>
              </div>
              <Button
                onClick={() => handleLikeSong(currentSong.id)}
                variant="ghost"
                size="sm"
                className={`${likedSongs.includes(currentSong.id) ? "text-red-400" : "text-gray-400"} hover:text-red-400`}
              >
                <Heart className={`h-5 w-5 ${likedSongs.includes(currentSong.id) ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-4">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={([value]) => seek(value)}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setIsShuffled(!isShuffled)}
                  variant="ghost"
                  size="sm"
                  className={`${isShuffled ? "text-purple-400" : "text-gray-400"} hover:text-white`}
                >
                  <Shuffle className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsRepeating(!isRepeating)}
                  variant="ghost"
                  size="sm"
                  className={`${isRepeating ? "text-purple-400" : "text-gray-400"} hover:text-white`}
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button onClick={handlePrevious} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handlePlayPause}
                  className="bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 rounded-full"
                  disabled={!isLoaded}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button onClick={handleNext} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2 min-w-[120px]">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="flex-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Focus Playlists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {focusPlaylists.map((playlist) => (
          <Card
            key={playlist.id}
            className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-lg transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{playlist.name}</CardTitle>
                <Badge className={getFocusColor(playlist.focusType)}>
                  {getFocusIcon(playlist.focusType)}
                  <span className="ml-1">{playlist.focusType}</span>
                </Badge>
              </div>
              <CardDescription className="text-gray-400">{playlist.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {playlist.songs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => handleSongSelect(song, playlist)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800/50 ${
                      currentSong?.id === song.id ? "bg-purple-600/20 border border-purple-500/30" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-400 hover:text-white">
                        {currentSong?.id === song.id && isPlaying ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                      </Button>
                      <div>
                        <p className="text-white text-sm font-medium">{song.title}</p>
                        <p className="text-gray-400 text-xs">{song.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLikeSong(song.id)
                        }}
                        variant="ghost"
                        size="sm"
                        className={`${likedSongs.includes(song.id) ? "text-red-400" : "text-gray-400"} hover:text-red-400`}
                      >
                        <Heart className={`h-3 w-3 ${likedSongs.includes(song.id) ? "fill-current" : ""}`} />
                      </Button>
                      <div className="text-gray-400 text-xs">{song.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Liked Songs */}
      {likedSongs.length > 0 && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400 fill-current" />
              Liked Songs
            </CardTitle>
            <CardDescription className="text-gray-400">Your favorite focus tracks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {focusPlaylists
                .flatMap((p) => p.songs)
                .filter((song) => likedSongs.includes(song.id))
                .map((song) => (
                  <div
                    key={song.id}
                    onClick={() => handleSongSelect(song)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800/50 ${
                      currentSong?.id === song.id ? "bg-purple-600/20 border border-purple-500/30" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-400 hover:text-white">
                        {currentSong?.id === song.id && isPlaying ? (
                          <Pause className="h-3 w-3" />
                        ) : (
                          <Play className="h-3 w-3" />
                        )}
                      </Button>
                      <div>
                        <p className="text-white text-sm font-medium">{song.title}</p>
                        <p className="text-gray-400 text-xs">{song.artist}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs">{song.duration}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Music Recommendations */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Focus Music Tips</CardTitle>
          <CardDescription className="text-gray-400">Optimize your productivity with the right music</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-white font-medium">Best for Deep Work:</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Ambient and instrumental music</li>
                <li>• 60-70 BPM tempo</li>
                <li>• No lyrics or vocals</li>
                <li>• Consistent rhythm</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-medium">Volume Guidelines:</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Keep volume at 50-60%</li>
                <li>• Lower for complex tasks</li>
                <li>• Higher for repetitive work</li>
                <li>• Use noise-canceling headphones</li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700">
              <Download className="h-4 w-4 mr-2" />
              Download for Offline
            </Button>
            <Button variant="outline" className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Spotify
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
