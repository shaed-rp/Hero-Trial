import Script from 'next/script';

const GTranslate = () => {
  return (
    <>
      <Script id='gtranslate-settings' strategy='beforeInteractive'>
        {`
          window.gtranslateSettings = {
            "default_language": "en",
            "native_language_names": false,
            "detect_browser_language": true,
            "flags": true,
            "flag_style": "2d",
            "languages": ["en", "fr", "it", "es", "zh-CN", "zh-TW", "ar"],
            "wrapper_selector": ".gtranslate_wrapper",
            "alt_flags": {"en": "usa"}
          };
        `}
      </Script>
      <Script
        src='https://cdn.gtranslate.net/widgets/latest/float.js'
        strategy='afterInteractive'
        id='gtranslate-script'
      />
      <div className='gtranslate_wrapper'></div>
    </>
  );
};

export default GTranslate;
