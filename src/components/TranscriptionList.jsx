import { useState, useEffect } from 'react';
import TranscriptionCard from './TranscriptionCard';
import { fetchTranscriptions } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

const TranscriptionList = ({ newTranscription }) => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadTranscriptions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTranscriptions(user.id);
        setTranscriptions(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching transcriptions:', err);
        setError('Failed to load transcriptions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadTranscriptions();
  }, [user]);

  useEffect(() => {
    if (newTranscription) {
      setTranscriptions((prev) => [newTranscription, ...prev]);
    }
  }, [newTranscription]);

  const handleUpdate = (updatedTranscription) => {
    setTranscriptions((prev) =>
      prev.map((item) =>
        item.id === updatedTranscription.id ? updatedTranscription : item
      )
    );
  };

  const handleDelete = (id) => {
    setTranscriptions((prev) => prev.filter((item) => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader size={24} className="animate-spin mr-2" />
        <p>Loading transcriptions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        {error}
      </div>
    );
  }

  if (transcriptions.length === 0) {
    return (
      <div className="p-8 text-center bg-muted rounded-lg">
        <p className="text-lg mb-2">No transcriptions yet</p>
        <p className="text-muted-foreground">
          Start recording or upload an audio file to create your first transcription.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Transcriptions</h2>
      <div className="space-y-4">
        {transcriptions.map((transcription) => (
          <TranscriptionCard
            key={transcription.id}
            transcription={transcription}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TranscriptionList;