const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 2 * 1024 * 1024;

export async function fileToBase64(file: File): Promise<{ mimeType: string; data: string }> {
  if (!ALLOWED.has(file.type)) throw new Error("Use a JPG, PNG, or WebP image");
  if (file.size > MAX_BYTES) throw new Error("Max file size is 2MB");
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.readAsDataURL(file);
  });
  const data = dataUrl.split(",")[1] ?? "";
  if (!data) throw new Error("Could not read the file");
  return { mimeType: file.type, data };
}
