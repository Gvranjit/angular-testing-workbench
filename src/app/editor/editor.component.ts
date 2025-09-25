/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoNgNARATAdArDADBSBGRAWOBmAnIgdjwzxFQA5DtEoC44ptUoTc3E5yCLONlIApgDsUiMMFRhJY6VIC6kAuQDGAE1SrcEOUA===
 */

import {
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  type AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  type EditorConfig,
  ClassicEditor,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Emoji,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  PlainTableOutput,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableLayout,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  BalloonEditor,
} from 'ckeditor5';

const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDY5MjE1OTksImp0aSI6ImQ4MjZhMTQ0LWFiMmMtNDE2Yy04NGNhLWE4MmI0ZmM5OTlkMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImE5YjllMDc1In0.nciD2tEo7UjpIKNouOyvHWF0-vWMqWCA-xz56AhrwAEFe0hc5hetDEUBu9tIuRdsIcxsAw2ZDElAmaFo7vsHLQ';

const CLOUD_SERVICES_TOKEN_URL =
  'https://8_69nqxs_0ly.cke-cs.com/token/dev/643d5a746576acc54228c25d8a7dac921493d42023a16fbd71f45eafc5d7?limit=10';

@Component({
  selector: 'editor',
  standalone: false,
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements AfterViewInit {
  constructor(private changeDetector: ChangeDetectorRef) {}

  public isLayoutReady = false;
  public Editor = BalloonEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'emoji',
          'link',
          'insertImage',
          'ckbox',
          'mediaEmbed',
          'insertTable',
          'insertTableLayout',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        Autoformat,
        AutoImage,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        CKBox,
        CKBoxImageEdit,
        CloudServices,
        Emoji,
        Essentials,
        Heading,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Mention,
        Paragraph,
        PasteFromOffice,
        PictureEditing,
        PlainTableOutput,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableLayout,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
      ],
      balloonToolbar: [
        'bold',
        'italic',
        '|',
        'link',
        'insertImage',
        '|',
        'bulletedList',
        'numberedList',
      ],
      cloudServices: {
        tokenUrl: CLOUD_SERVICES_TOKEN_URL,
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage',
          '|',
          'ckboxImageEdit',
        ],
      },
      initialData: '',
      licenseKey: LICENSE_KEY,
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      mention: {
        feeds: [
          {
            marker: '@',
            feed: [
              /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
            ],
          },
        ],
      },
      placeholder: 'Type or paste your content here!',
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
      },
    };

    configUpdateAlert(this.config);

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();
  }
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config: any) {
  if ((configUpdateAlert as any).configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (
    currentValue: string | undefined,
    forbiddenValue: string
  ) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  (configUpdateAlert as any).configUpdateAlertShown = true;

  if (
    !isModifiedByUser(
      config.cloudServices?.tokenUrl,
      '<YOUR_CLOUD_SERVICES_TOKEN_URL>'
    )
  ) {
    valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'to receive full access to Premium Features:',
        '',
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join('\n')
    );
  }
}
