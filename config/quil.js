export default {
  theme: 'snow',
  readOnly: false,
  placeholder: 'متن مورد نظر را وارد کنید',
  bounds: 'self',
  modules: {
    toolbar: [
      // we can use subArray for grouping multiple things inside toolbar
      ['bold', 'italic', 'underline', 'strike'],
      [
        { header: [false, 1, 2, 3, 4, 5, 6] },
        { size: ['small', false, 'large', 'huge'] },
      ],
      [{ color: [] }, { background: [] }],
      // [{ font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }, { direction: 'rtl' }],
      ['link', 'image', 'video', 'formula'],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      ['clean'], // remove any formatting that selected text has
    ],
  },
};
