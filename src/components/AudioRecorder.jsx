import { useState, useEffect } from 'react';
import { Mic, Square, Loader } from 'lucide-react';
import { startRecording, formatTime } from '../utils/audioHelpers';
import { saveTranscription } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AudioRecorder = ({ onTranscriptionSaved }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [title, setTitle] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = async () => {
    try {
      const newRecorder = await startRecording();
      setRecorder(newRecorder);
      newRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setAudioUrl(null);
      setTranscription('');
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Could not access microphone. Please check your permissions.');
    }
  };

  const handleStopRecording = async () => {
    if (recorder) {
      setIsRecording(false);
      setIsProcessing(true);
      try {
        const { audioBlob, audioUrl } = await recorder.stop();
        setAudioUrl(audioUrl);
        
        // Simulating transcription process
        setTimeout(() => {
          const simulatedTranscription = "This is a simulated transcription of your audio recording. In a real app, we'd use a speech-to-text service like Google Cloud Speech-to-Text, AWS Transcribe, or Azure Speech Services.";
          setTranscription(simulatedTranscription);
          setIsProcessing(false);
        }, 2000);
      } catch (error) {
        console.error('Failed to stop recording:', error);
        setIsProcessing(false);
      }
    }
  };

  const handleSaveTranscription = async () => {
    if (!transcription) return;
    
    try {
      setIsProcessing(true);
      const finalTitle = title || `Recording ${new Date().toLocaleString()}`;
      const savedTranscription = await saveTranscription(
        user.id,
        finalTitle,
        transcription,
        audioUrl
      );
      
      onTranscriptionSaved(savedTranscription);
      setTitle('');
      setTranscription('');
      setAudioUrl(null);
      setIsProcessing(false);
    } catch (error) {
      console.error('Failed to save transcription:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Record Audio</h2>
      
      <div className="flex items-center justify-center mb-4">
        {isRecording ? (
          <button
            onClick={handleStopRecording}
            className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full flex items-center justify-center transition-colors"
          >
            <Square size={24} />
          </button>
        ) : (
          <button
            onClick={handleStartRecording}
            className="bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full flex items-center justify-center transition-colors"
            disabled={isProcessing}
          >
            <Mic size={24} />
          </button>
        )}
      </div>
      
      {isRecording && (
        <div className="text-center mb-4">
          <div className="waveform mb-2">
            <div className="wave"></div>
          </div>
          <p className="text-xl font-mono">{formatTime(recordingTime)}</p>
        </div>
      )}
      
      {isProcessing && (
        <div className="flex items-center justify-center mb-4">
          <Loader size={24} className="animate-spin mr-2" />
          <p>Processing audio...</p>
        </div>
      )}
      
      {audioUrl && !isProcessing && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Review Recording</h3>
          <audio src={audioUrl} controls className="w-full"></audio>
        </div>
      )}
      
      {transcription && !isProcessing && (
        <div className="mb-4">
          <h3 className="font-medium mb-2">Transcription</h3>
          <div className="bg-muted p-4 rounded-md">
            <p>{transcription}</p>
          </div>
          
          <div className="mt-4">
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
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;