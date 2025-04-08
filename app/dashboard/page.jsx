'use client'
import { useState, useEffect } from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Navbar from '@/app/_components/Navbar';
import CreateNote from '@/app/_components/CreateNote';
import TextCard from '@/app/_components/TextCard';
import { Pin, Search, PlusCircle, X } from 'lucide-react';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  // Fetch notes when component mounts
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchNotes();
    }
  }, [isLoaded, isSignedIn]);

  const fetchNotes = async () => {
    try {
      const token = await getToken();
      console.log("Auth token:", token ? "Token exists" : "No token");

      const response = await fetch('/api/notes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error('Failed to fetch notes');
      }

      const data = await response.json();
      console.log("Fetched notes:", data);
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (noteData) => {
    try {
      const token = await getToken();
      console.log("Auth token for addNote:", token ? "Token exists" : "No token");

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(noteData),
      });

      console.log("Add note response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error('Failed to create note');
      }

      const newNote = await response.json();
      setNotes(prevNotes => [newNote, ...prevNotes]);
      return true;
    } catch (error) {
      console.error('Error adding note:', error);
      return false;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const token = await getToken();
      console.log("Updating note with data:", noteData);

      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) throw new Error('Failed to update note');
      const updatedNote = await response.json();
      console.log("Note update response:", updatedNote);

      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? updatedNote : note
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating note:', error);
      return false;
    }
  };

  const togglePin = async (id, isPinned) => {
    try {
      const note = notes.find(note => note._id === id);
      if (!note) return;

      const updatedNote = await updateNote(id, {
        ...note,
        isPinned: isPinned
      });

      if (updatedNote) {
        // Sort notes to show pinned notes first
        setNotes(prevNotes => {
          const updatedNotes = prevNotes.map(note =>
            note._id === id ? { ...note, isPinned } : note
          );

          return updatedNotes.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        });
      }
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = await getToken();
      console.log("Delete note - Auth token:", token ? "Token exists" : "No token");

      if (!token) {
        console.error("No auth token available for delete operation");
        return;
      }

      console.log("Attempting to delete note:", id);
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete error response:", errorData);
        throw new Error(errorData.error || 'Failed to delete note');
      }

      const result = await response.json();
      console.log("Delete result:", result);

      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentNote(null);
  };

  const togglePinnedView = () => {
    setShowPinnedOnly(!showPinnedOnly);
    setSearchQuery(''); // Clear search when toggling pinned view
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setShowPinnedOnly(false); // Exit pinned view when entering search
    } else {
      setSearchQuery(''); // Clear search when exiting search mode
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = notes.filter(note => {
    // First filter by pinned status if in pinned view
    if (showPinnedOnly && !note.isPinned) return false;

    // Then filter by search query if searching
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        (note.summary && note.summary.toLowerCase().includes(query))
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F5F2] dark:bg-[#2D2D3A]">
      <Navbar customButton={<UserButton showName />} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold text-[#2D2D3A] dark:text-[#F8F5F2]">
              My Notes
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <PlusCircle size={20} />
                <span className="font-medium">New Note</span>
              </button>

              <button
                onClick={togglePinnedView}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${showPinnedOnly
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                  : 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2]'
                  }`}
              >
                <Pin size={20} />
                <span className="font-medium">{showPinnedOnly ? 'All Notes' : 'Pinned'}</span>
              </button>

              <button
                onClick={toggleSearch}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isSearching
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                  : 'bg-[#E5E0D9] dark:bg-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2]'
                  }`}
              >
                {isSearching ? <X size={20} /> : <Search size={20} />}
                <span className="font-medium">{isSearching ? 'Close' : 'Search'}</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearching && (
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-[#E5E0D9] dark:border-[#3D3D4A] bg-white dark:bg-[#3D3D4A] text-[#2D2D3A] dark:text-[#F8F5F2] focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all"
                />
                <Search className="absolute left-4 top-3.5 text-[#2D2D3A]/40 dark:text-[#F8F5F2]/40" size={20} />
              </div>
            </div>
          )}

          {/* Notes Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : (
            <>
              {filteredNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.map((note) => (
                    <TextCard
                      key={note._id}
                      title={note.title}
                      content={note.content}
                      date={note.createdAt}
                      onDelete={() => deleteNote(note._id)}
                      onEdit={() => handleEdit(note)}
                      noteId={note._id}
                      summary={note.summary}
                      enhancedContent={note.enhancedContent}
                      category={note.category}
                      isPinned={note.isPinned}
                      onPin={togglePin}
                      searchQuery={searchQuery}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-white dark:bg-[#3D3D4A] rounded-xl p-8 max-w-md mx-auto">
                    <h3 className="text-xl font-semibold text-[#2D2D3A] dark:text-[#F8F5F2] mb-2">
                      {showPinnedOnly ? 'No Pinned Notes' : isSearching ? 'No Results Found' : 'No Notes Yet'}
                    </h3>
                    <p className="text-[#2D2D3A]/60 dark:text-[#F8F5F2]/60">
                      {showPinnedOnly
                        ? 'Pin your important notes to access them quickly.'
                        : isSearching
                          ? 'Try different keywords or check your spelling.'
                          : 'Create your first note to get started!'}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <CreateNote
        isOpen={isOpen}
        onClose={handleCloseModal}
        addNote={addNote}
        currentNote={currentNote}
        updateNote={updateNote}
      />
    </div>
  );
}
