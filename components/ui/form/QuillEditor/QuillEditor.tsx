import React, { useEffect, useRef } from 'react'

import Quill from 'quill'

import 'quill/dist/quill.snow.css'

import { QuillControllerProps } from '@/components/ui/form/QuillEditor/types'

const QuillEditor = ({ onChange, label, value }: QuillControllerProps) => {
  const quillRef = useRef<HTMLDivElement>(null)
  const quillInstanceRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (quillRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
          ],
        },
      })

      quillInstanceRef.current.root.innerHTML = value

      quillInstanceRef.current.on('text-change', () => {
        const html = quillInstanceRef.current?.root.innerHTML || ''
        onChange(html)
      })
    }
  }, [onChange, value])

  useEffect(() => {
    if (quillInstanceRef.current) {
      quillInstanceRef.current.root.innerHTML = value
    }
  }, [value])

  return (
    <>
      {label && (
        <label className="Text Text_lineHeight_m Text_size_m Text_view_secondary FieldLabel TextField-Label TextField-Label_labelPosition_top mb-2">
          {label}
        </label>
      )}
      <div ref={quillRef} style={{ height: '150px' }} />
    </>
  )
}

export default QuillEditor
