import { useState } from 'react';
import Navbar from '../components/Navbar';
import AudioRecorder from '../components/AudioRecorder';
import FileUploader from '../components/FileUploader';
import TranscriptionList from '../components/TranscriptionList';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [newTranscription, setNewTranscription] = useState(null);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  const handleTranscriptionSaved = (transcription) => {
    setNewTranscription(transcription);
    // Show a success message or notification here if desired
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-md overflow-hidden mb-8">
              <div className="flex border-b">
                <button
                  className={`flex-1 p-4 text-center font-medium ${
                    activeTab === 'record'
                      ? 'bg-primary/10 text-primary border-b-2 border-primary'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveTab('record')}
                >
                  Record
                </button>
                <button
                  className={`flex-1 p-4 text-center font-medium ${
                    activeTab === 'upload'
                      ? 'bg-primary/10 text-primary border-b-2 border-primary'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveTab('upload')}
                >
                  Upload
                </button>
              </div>
              
              <div className="p-0">
                {activeTab === 'record' ? (
                  <AudioRecorder onTranscriptionSaved={handleTranscriptionSaved} />
                ) : (
                  <FileUploader onTranscriptionSaved={handleTranscriptionSaved} />
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <TranscriptionList newTranscription={newTranscription} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;