import { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import { convertSpeechToText } from '../utils/audioHelpers';
import { saveTranscription } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const FileUploader = ({ onTranscriptionSaved }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [title, setTitle] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setAudioUrl(URL.createObjectURL(selectedFile));
    } else {
      alert('Please select an audio file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    try {
      // In a real app, you'd send the file to a server or use a client-side speech-to-text API
      // For this demo, we'll use a mock function
      const text = await convertSpeechToText(file);
      setTranscription(text);
    } catch (error) {
      console.error('Failed to transcribe audio:', error);
      alert('Failed to transcribe audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTranscription = async () => {
    if (!transcription) return;
    
    try {
      setIsLoading(true);
      const finalTitle = title || file.name || `Uploaded ${new Date().toLocaleString()}`;
      const savedTranscription = await saveTranscription(
        user.id,
        finalTitle,
        transcription,
        audioUrl
      );
      
      onTranscriptionSaved(savedTranscription);
      setFile(null);
      setTitle('');
      setTranscription('');
      setAudioUrl(null);
    } catch (error) {
      console.error('Failed to save transcription:', error);
      alert('Failed to save transcription. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Audio</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 cursor-pointer hover:bg-muted/50 transition-colors text-center">
          <input
            type="file"
            id="file-upload"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload size={32} className="mb-2" />
            <p className="mb-2">Click to upload audio file</p>
            <p className="text-sm text-muted-foreground">MP3, WAV, M4A, AAC</p>
          </label>
        </div>
        
        {file && (
          <div className="mb-4">
            <p className="mb-2">Selected file: {file.name}</p>
            <audio src={audioUrl} controls className="w-full"></audio>
          </div>
        )}
        
        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded w-full disabled:opacity-50"
          disabled={!file || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader size={16} className="animate-spin mr-2" />
              Transcribing...
            </span>
          ) : (
            'Transcribe Audio'
          )}
        </button>
      </form>
      
      {transcription && !isLoading && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Transcription</h3>
          <div className="bg-muted p-4 rounded-md mb-4">
            <p>{transcription}</p>
          </div>
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this transcription"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handleSaveTranscription}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded w-full"
          >
            Save Transcription
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;