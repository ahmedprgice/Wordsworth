# Multi-Language Support Documentation

## Overview
The Wordsworth Language Centre website now supports 4 languages:
- **English (EN)** - Default
- **Arabic (AR)** - RTL support enabled
- **Chinese (ZH)**
- **Malay/Bahasa (MS)**

## How It Works

### Language Context
The application uses a React Context (`LanguageContext`) to manage:
- Current language state
- Translation function (`t()`)
- RTL detection for Arabic

### RTL Support for Arabic
When Arabic is selected:
- Document direction automatically changes to RTL (`dir="rtl"`)
- Custom CSS handles layout mirroring
- Text alignment adjusts automatically
- Icons and buttons flip appropriately

### Currently Translated Sections
✅ Navigation menu (all links)
✅ Hero section (stats)
✅ Courses section (titles, buttons)
✅ Action buttons (Apply Now, Login, View Details, Download Brochure)

## Adding New Translations

To add translations for additional content:

1. **Open** `/src/app/contexts/LanguageContext.tsx`
2. **Add new keys** to the `translations` object for each language
3. **Use** the `t()` function in your components:

```typescript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t('myKey')}</h1>;
}
```

### Example Translation Addition

```typescript
const translations: Record<Language, Record<string, string>> = {
  en: {
    'myKey': 'My English Text',
  },
  ar: {
    'myKey': 'النص العربي',
  },
  zh: {
    'myKey': '中文文本',
  },
  ms: {
    'myKey': 'Teks Bahasa Melayu',
  },
};
```

## Testing Arabic (RTL) Layout

1. Click the language switcher (globe icon) in the navbar
2. Select **العربية** (Arabic)
3. The entire site will:
   - Flip to right-to-left layout
   - Display Arabic translations
   - Adjust all UI elements for RTL reading

## Custom RTL Styling

RTL-specific styles are in `/src/styles/rtl.css`:
- Automatic margin/padding flipping
- Text alignment adjustments
- Icon rotation handling
- Dropdown positioning

## Future Enhancements

To complete full translation:
- Add translations for all page content
- Translate course descriptions
- Translate form labels
- Translate footer content
- Translate blog posts

## Translation Guidelines

1. **Keep keys descriptive**: `nav.home` not `n1`
2. **Group by section**: Use prefixes like `nav.`, `courses.`, `footer.`
3. **Maintain consistency**: Use the same terms across languages
4. **Test RTL**: Always check Arabic to ensure proper layout
5. **Keep it short**: Navigation items should be concise in all languages
