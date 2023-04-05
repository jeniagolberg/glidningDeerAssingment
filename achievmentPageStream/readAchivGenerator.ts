const readAchievementsPage = async function* (
    stream: NodeJS.ReadableStream,
  ): AsyncGenerator<string[]> {
    let buffer = '';
    let chunkCount = 0;
  
    for await (const chunk of stream) {
      // Append the data chunk to the buffer
      buffer += chunk.toString();
  
      // Split the buffer by semicolons and process the chunks
      const chunks = buffer.split(';');
      buffer = chunks.pop() || '';
  
      // Yield the chunks for every 10 data chunks
      chunkCount += chunks.length;
      if (chunkCount >= 10) {
        yield chunks;
        chunkCount = 0;
      }
    }
  
    // Process any remaining chunks in the buffer
    if (buffer) {
        const chunks = buffer.split(';');
        yield chunks;
        buffer = '';
    }
  };