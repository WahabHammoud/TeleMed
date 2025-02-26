
export async function createDailyRoom(consultationId: string) {
  try {
    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: `consultation-${consultationId}`,
        properties: {
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: false,
          start_audio_off: false,
        },
      }),
    });

    const room = await response.json();
    return room;
  } catch (error) {
    console.error('Error creating Daily.co room:', error);
    throw error;
  }
}
