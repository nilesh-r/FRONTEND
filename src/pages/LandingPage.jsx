import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Mic, Upload, FileText, Repeat, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:justify-between lg:items-center">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                <span className="block">Turn your voice into</span>
                <span className="block text-primary">perfect text</span>
              </h1>
              <p className="mt-3 max-w-md text-lg text-muted-foreground sm:text-xl md:mt-5">
                Transcribe your audio recordings and voice notes with ease. Save time and focus on what matters most to you.
              </p>
              <div className="mt-10 flex gap-4">
                <Link
                  to="/signup"
                  className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/signin"
                  className="px-8 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="relative">
                <div className="bg-card rounded-lg shadow-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                    <div className="h-4 bg-muted rounded w-4/5"></div>
                  </div>
                  <div className="mt-6 p-4 bg-muted rounded-md flex items-center justify-center">
                    <div className="waveform w-full">
                      <div className="wave"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Transform your audio into text
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
              Our powerful speech recognition technology makes it easy to convert your audio to text.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Mic size={24} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Record Audio</h3>
              <p className="text-muted-foreground">
                Easily record audio directly in the app. No additional equipment needed.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Upload size={24} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Upload Files</h3>
              <p className="text-muted-foreground">
                Upload existing audio files in various formats including MP3, WAV, M4A, and more.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Accurate Transcription</h3>
              <p className="text-muted-foreground">
                Get highly accurate transcripts of your audio powered by advanced AI technology.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Repeat size={24} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Edit and Review</h3>
              <p className="text-muted-foreground">
                Easily edit and review your transcriptions with our intuitive interface.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Smart Features</h3>
              <p className="text-muted-foreground">
                Automatic punctuation, speaker identification, and more intelligent features.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-md p-6">
              <div className="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Organize and Share</h3>
              <p className="text-muted-foreground">
                Keep all your transcriptions organized and easily share them with others.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mb-4">
            Ready to get started?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8">
            Join thousands of users who are already saving time with our speech-to-text solution.
          </p>
          <Link
            to="/signup"
            className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Try it for free
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-card py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src="/assets/logo.svg" alt="SpeechScribe Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary">SpeechScribe</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} SpeechScribe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;