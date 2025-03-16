// Convert blob to base64
export const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  
  // Convert audio file to text using browser's Speech Recognition API
  export const convertSpeechToText = (audioBlob) => {
    return new Promise((resolve, reject) => {
      // This is a placeholder since browser Speech Recognition API doesn't work directly with audio files
      // In a real app, you would send this to a server with a speech-to-text service
      // For demo purposes, we're simulating a successful response
      setTimeout(() => {
        resolve("This is a simulated transcription of the audio. In a real application, you would integrate with a service like Google Cloud Speech-to-Text, Amazon Transcribe, or Azure Speech Services.");
      }, 2000);
    });
  };
  
  // Record audio from microphone
  export const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];
  
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
  
      const start = () => {
        mediaRecorder.start();
      };
  
      const stop = () => {
        return new Promise((resolve) => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            resolve({ audioBlob, audioUrl });
          });
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
        });
      };
  
      return { start, stop };
    } catch (error) {
      console.error("Error accessing microphone:", error);
      throw error;
    }
  };
  
  // Format time in seconds to MM:SS format
  export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };