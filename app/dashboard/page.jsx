'use client'
import { useState, useEffect } from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Navbar from '@/app/_components/Navbar';
import CreateNote from '@/app/_components/CreateNote';
import TextCard from '@/app/_components/TextCard';
import { Pin, Search, Pencil } from 'lucide-react';

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
    <>
      <div>
        <Navbar customButton={<UserButton showName />} />
      </div>

      <div className='flex items-center justify-center gap-6 p-5'>
        <div>
          <button
            className="bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-800/60 dark:bg-emerald-800/40 text-white font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4"
            onClick={() => setIsOpen(true)}
          >
            <Pencil />Add Note
          </button>
          <CreateNote
            isOpen={isOpen}
            onClose={handleCloseModal}
            addNote={addNote}
            currentNote={currentNote}
            updateNote={updateNote}
          />
        </div>

        <button
          className={`bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-800/60 dark:bg-emerald-800/40 text-white font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4 ${showPinnedOnly ? 'ring-2 ring-emerald-500' : ''}`}
          onClick={togglePinnedView}
        >
          <Pin />{showPinnedOnly ? 'All Notes' : 'Pinned Notes'}
        </button>
        <button
          className={`bg-dbtn hover:bg-emerald-900 dark:hover:bg-emerald-800/60 dark:bg-emerald-800/40 text-white font-myfont font-bold text-lg text-[1.5rem] gap-2 flex items-center rounded-3xl p-4 ${isSearching ? 'ring-2 ring-emerald-500' : ''}`}
          onClick={toggleSearch}
        >
          <Search />{isSearching ? 'Cancel Search' : 'Search Notes'}
        </button>
      </div>

      {isSearching && (
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search in titles and content..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 rounded-full border border-emerald-700/30 bg-white dark:bg-[#0C1716] text-emerald-900 dark:text-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-3.5 text-emerald-500" size={20} />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center mt-10 px-4">
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
              category={note.category}
              isPinned={note.isPinned}
              onPin={togglePin}
              searchQuery={searchQuery}
            />
          ))}
          {showPinnedOnly && notes.filter(note => note.isPinned).length === 0 && (
            <div className="text-center p-8 bg-white dark:bg-[#0C1716] rounded-3xl border border-emerald-700/30 w-full max-w-2xl">
              <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-2">No Pinned Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">You haven't pinned any notes yet. Click the pin icon on a note to pin it.</p>
            </div>
          )}
          {isSearching && searchQuery && filteredNotes.length === 0 && (
            <div className="text-center p-8 bg-white dark:bg-[#0C1716] rounded-3xl border border-emerald-700/30 w-full max-w-2xl">
              <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-2">No Results Found</h3>
              <p className="text-gray-600 dark:text-gray-400">No notes match your search query. Try a different search term.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
