/** Photo upload UI helpers — integration-ready for backend later */

export function initPhotoUploads(root = document) {
  root.querySelectorAll('.js-photo-input').forEach((input) => {
    const preview = input.closest('.form-field')?.querySelector('.js-photo-preview')
    if (!preview) return

    const maxFiles = Number(input.dataset.maxFiles || 6)
    const maxMb = Number(input.dataset.maxMb || 5)
    /** @type {File[]} */
    let files = []

    const render = () => {
      preview.innerHTML = files
        .map(
          (file, index) => `
        <li class="upload-preview__item">
          <img src="${URL.createObjectURL(file)}" alt="" width="72" height="72" />
          <button type="button" data-remove="${index}" aria-label="Verwijder ${file.name}">×</button>
        </li>`
        )
        .join('')

      // Keep FileList-like state for future backend FormData integration
      input._selectedFiles = files
    }

    input.addEventListener('change', () => {
      const incoming = [...(input.files || [])]
      const next = [...files]

      for (const file of incoming) {
        if (!file.type.startsWith('image/')) continue
        if (file.size > maxMb * 1024 * 1024) {
          alert(`Bestand ${file.name} is groter dan ${maxMb} MB.`)
          continue
        }
        if (next.length >= maxFiles) {
          alert(`U kunt maximaal ${maxFiles} foto’s toevoegen.`)
          break
        }
        next.push(file)
      }

      files = next
      input.value = ''
      render()
    })

    preview.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-remove]')
      if (!btn) return
      files.splice(Number(btn.dataset.remove), 1)
      render()
    })
  })
}

export function getSelectedPhotos(form) {
  const files = []
  form.querySelectorAll('.js-photo-input').forEach((input) => {
    if (Array.isArray(input._selectedFiles)) files.push(...input._selectedFiles)
  })
  return files
}
