export function createDummyFile(name = 'test.pdf', sizeMB = 1) {
  const sizeInBytes = sizeMB * 1024 * 1024;

  return {
    name,
    buffer: Buffer.alloc(sizeInBytes), // file content
  };
}

export async function uploadFile(url: string, name = 'test.pdf', sizeMB = 1) {
  const file = createDummyFile(name, sizeMB);
  const form = new FormData();

  form.append(
    'file',
    new Blob([file.buffer], { type: 'application/pdf' }),
    file.name,
  );
  return await fetch(url, {
    method: 'POST',
    body: form,
  });
}

export async function downloadFile(url: string) {
  return await fetch(url, {
    method: 'GET',
  });
}
export async function deleteFile(url: string) {
  return await fetch(url, {
    method: 'DELETE',
  });
}
