
const readAchievementsPage = function (
        stream: NodeJS.ReadableStream, 
        onPage: (achievements: string[]) => void,
        onDove: () => void, 
        onError: (error: Error) => void): void {

let buffer = '';
let chunkCount = 0;

  stream.on('data', (chunk: Buffer | string) => {
    // Append the data chunk to the buffer
    
    buffer += chunk.toString();

    // Split the buffer by semicolons and process the chunks
    const chunks = buffer.split(';');
    buffer = chunks.pop() || '';

    // Invoke the onPage function for every 10 data chunks
    chunkCount += chunks.length;
    if (chunkCount >= 10) {
      stream.pause();
      onPage(chunks);
      chunkCount = 0;
      stream.resume();
    }
  });

  stream.on('end', () => {
    // Process any remaining chunks in the buffer
    if (buffer) {
      const chunks = buffer.split(';');
      onPage([buffer]);
      buffer = '';
    }
    onDove();
  });

  stream.on('error', (error: Error) => {
    onError(error);
  });

}

export default readAchievementsPage;