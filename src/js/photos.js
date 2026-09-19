/** Photo upload UI — preview, remove, size feedback (no backend upload) */

function formatMb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1)
}

export function initPhotoUploads(root = document) {
  const groups = new Map()

  root.querySelectorAll('.js-photo-input').forEach((input) => {
    const groupId = input.dataset.photoGroup || input.id || 'default'
    const field = input.closest('.form-field')
    const preview =
      root.querySelector(`.js-photo-preview[data-photo-group="${groupId}"]`) ||
      field?.querySelector('.js-photo-preview')
    const feedback =
      root.querySelector(`.js-photo-feedback[data-photo-group="${groupId}"]`) ||
      field?.querySelector('.js-photo-feedback')

    if (!preview) return

    if (!groups.has(groupId)) {
      groups.set(groupId, { files: [], inputs: [], preview, feedback })
    }
    const group = groups.get(groupId)
    group.inputs.push(input)
    group.preview = preview
    if (feedback) group.feedback = feedback

    const maxFiles = Number(input.dataset.maxFiles || 6)
    const maxMb = Number(input.dataset.maxMb || 5)

    const showFeedback = (message) => {
      if (!group.feedback) return
      group.feedback.hidden = !message
      group.feedback.textContent = message || ''
    }

    const render = () => {
      group.preview.innerHTML = group.files
        .map(
          (file, index) => `
        <li class="upload-preview__item">
          <img src="${URL.createObjectURL(file)}" alt="" width="72" height="72" />
          <button type="button" data-remove="${index}" aria-label="Verwijder ${file.name}">×</button>
        </li>`
        )
        .join('')

      group.inputs.forEach((el) => {
        el._selectedFiles = group.files
      })
    }

    input.addEventListener('change', () => {
      const incoming = [...(input.files || [])]
      const next = [...group.files]
      let feedbackMsg = ''

      for (const file of incoming) {
        if (!file.type.startsWith('image/') && file.type !== '') {
          feedbackMsg = `${file.name} is geen afbeelding.`
          continue
        }
        if (file.size > maxMb * 1024 * 1024) {
          feedbackMsg = `${file.name} is ${formatMb(file.size)} MB. Maximum is ${maxMb} MB.`
          continue
        }
        if (next.length >= maxFiles) {
          feedbackMsg = `U kunt maximaal ${maxFiles} foto’s toevoegen.`
          break
        }
        next.push(file)
      }

      group.files = next
      input.value = ''
      showFeedback(feedbackMsg)
      render()
    })

    if (!group.preview._boundRemove) {
      group.preview._boundRemove = true
      group.preview.addEventListener('click', (event) => {
        const btn = event.target.closest('[data-remove]')
        if (!btn) return
        group.files.splice(Number(btn.dataset.remove), 1)
        showFeedback('')
        render()
      })
    }
  })
}

export function getSelectedPhotos(form) {
  const files = []
  const seen = new Set()
  form.querySelectorAll('.js-photo-input').forEach((input) => {
    if (!Array.isArray(input._selectedFiles)) return
    input._selectedFiles.forEach((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`
      if (seen.has(key)) return
      seen.add(key)
      files.push(file)
    })
  })
  return files
}
