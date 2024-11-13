import React, { useEffect, useState } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import MdEditor from 'react-markdown-editor-lite'
import TurndownService from 'turndown'

import { Text } from '@consta/uikit/Text'

import 'react-markdown-editor-lite/lib/index.css'

import { mdParser } from '@/utils/markdown'

type MarkdownEditorProps<T extends FieldValues> = {
  label: string
} & UseControllerProps<T>

const turndownService = new TurndownService()

function MarkdownEditor<T extends FieldValues>({
  control,
  name,
  label,
}: MarkdownEditorProps<T>) {
  const { field, fieldState } = useController({ control, name })
  const [markdownValue, setMarkdownValue] = useState(field.value || '')

  useEffect(() => {
    // update markdownValue when `field.value` changes externally (e.g. on `reset`)
    if (field.value) {
      const markdown = field.value.includes('<')
        ? turndownService.turndown(field.value) // convert html to markdown
        : field.value
      setMarkdownValue(markdown)
    }
  }, [field.value])

  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdownValue(text)
    field.onChange(text)
  }

  return (
    <div className="TextField TextField_labelPosition_top TextField_size_m TextField_view_default">
      <label className="Text Text_lineHeight_m Text_size_m Text_view_secondary FieldLabel TextField-Label TextField-Label_labelPosition_top">
        {label}
      </label>

      <MdEditor
        value={markdownValue}
        style={{ height: '300px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      {fieldState.error && <Text view="alert">{fieldState.error.message}</Text>}
    </div>
  )
}

export default MarkdownEditor
