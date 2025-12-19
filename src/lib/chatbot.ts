// Generate contact link with pre-filled question
export function generateContactLink(userMessage: string, productId?: string | null): string {
  const params = new URLSearchParams();
  params.set('subject', 'Chat Inquiry');
  params.set('details', userMessage);
  
  if (productId) {
    params.set('product', productId);
    params.set('interest', 'Product Inquiry');
  } else {
    params.set('interest', 'General Inquiry');
  }
  
  return `/contact?${params.toString()}`;
}
