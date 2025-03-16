import { supabase } from '../supabase';

export const fetchTranscriptions = async (userId) => {
  const { data, error } = await supabase
    .from('transcriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching transcriptions:', error);
    throw error;
  }
  
  return data;
};

export const saveTranscription = async (userId, title, transcriptionText, audioUrl = null) => {
  const { data, error } = await supabase
    .from('transcriptions')
    .insert([
      {
        user_id: userId,
        title,
        text: transcriptionText,
        audio_url: audioUrl,
      },
    ])
    .select();
  
  if (error) {
    console.error('Error saving transcription:', error);
    throw error;
  }
  
  return data[0];
};

export const deleteTranscription = async (transcriptionId) => {
  const { error } = await supabase
    .from('transcriptions')
    .delete()
    .eq('id', transcriptionId);
  
  if (error) {
    console.error('Error deleting transcription:', error);
    throw error;
  }
  
  return true;
};

export const updateTranscription = async (transcriptionId, updates) => {
  const { data, error } = await supabase
    .from('transcriptions')
    .update(updates)
    .eq('id', transcriptionId)
    .select();
  
  if (error) {
    console.error('Error updating transcription:', error);
    throw error;
  }
  
  return data[0];
};