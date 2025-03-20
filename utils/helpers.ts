export const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
  
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long',    
      day: 'numeric'    
    });
  
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  
    return `${formattedDate} | ${formattedTime}`;
};

export const formatAIResponse = (response: string) => {
  const jsonString = response.replace(/```json\n|\n```/g, '');
  const parsedData = JSON.parse(jsonString);

  return parsedData;
}