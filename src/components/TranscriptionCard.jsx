import { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { updateTranscription, deleteTranscription } from '../utils/api';

const TranscriptionCard = ({ transcription, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(transcription.title);
  const [text, setText] = useState(transcription.text);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedTranscription = await updateTranscription(transcription.id, {
        title,
        text,
      });
      onUpdate(updatedTranscription);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating transcription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this transcription?')) {
      setIsLoading(true);
      try {
        await deleteTranscription(transcription.id);
        onDelete(transcription.id);
      } catch (error) {
        console.error('Error deleting transcription:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-4 mb-4 fade-in">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 mb-2 border rounded min-h-32"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center px-3 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/90"
              disabled={isLoading}
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              <Save size={16} className="mr-1" /> Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-semibold">{transcription.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {formatDate(transcription.created_at)}
          </p>
          <p className="whitespace-pre-wrap">{transcription.text}</p>
          
          {transcription.audio_url && (
            <div className="mt-4">
              <audio src={transcription.audio_url} controls className="w-full"></audio>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranscriptionCard;