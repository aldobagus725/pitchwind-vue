export default {
  // Target Deployment
  // target: 'server',
  target: 'static',
  //rendering mode SSR	
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Bali Fun & Cheer',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      // Facebook Meta Tags
      { property :'og:url', content:'https://balifunncheer.com'},
      { property :'og:title', content:'Captcha'},
      { property :'og:description', content:'Bali Fun & Cheer sells party stuff that you guys needs to party! No worries, all is on a very good price, good quality, we got you covered!'},
      { property :'og:image', content:'https://balifunncheer.com'},
      // Twitter Meta Tags
      { name :'twitter:card', content:'summary_large_image'},
      { property :'twitter:domain', content:'https://balifunncheer.com'},
      { property :'twitter:url', content:'https://balifunncheer.com'},
      { name :'twitter:title', content:'Captcha'},
      { name :'twitter:description', content:'Bali Fun & Cheer sells party stuff that you guys needs to party! No worries, all is on a very good price, good quality, we got you covered!'},
      { name : 'google-site-verification', content:'1geetabIGzOUMnv55QDVAH_LxkoYWB2w7tffMBsDdkI'}
    ],
    link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/images/logo.png'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
    },
    {
      rel: 'canonical',
      href: 'https://balifunncheer.com'
    },
  ],
    script: [
      { src: '/js/coreui.bundle.min.js' }, 
      { src: 'https://app.sandbox.midtrans.com/snap/snap.js', 'data-client-key': 'SB-Mid-client-tAy-6ndC2AtC39FL' }, 
    ]
  },

  loading: {
    color: 'grey',	// <-- color
    height: '5px'	// <-- height
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.min.css',
    '@/assets/css/custom.css',
    'leaflet/dist/leaflet.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-star-rating.js', mode: 'client' },
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: '~/plugins/mixins.js' },
    { src: '~/plugins/jsonld' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  pwa: {
    meta: {
      title: 'Bali Fun & Cheer - Toko perlengkapan / alat pesta, dekorasi, dll',
      author: 'Bali Fun & Cheer'
    },
    manifest: {
      name: 'Bali Fun & Cheer Bali',
      short_name: 'Bali Fun & Cheer',
      description: 'Official Toko Online Bali Fun & Cheer',
      lang: 'en'
    },
    icon: {
      fileName: 'images/logo.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //https://dev.auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    //https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    // Robots
    '@nuxtjs/robots'
  ],
  // Robots
  robots: [
    {
      UserAgent: 'Googlebot',
      Disallow: '',
    },
    {
      UserAgent: 'googlebot-image',
      Disallow: '',
    },
    {
      UserAgent: 'googlebot-mobile',
      Disallow: '',
    },
    {
      UserAgent: 'MSNBot',
      Disallow: '',
    },
    {
      UserAgent: 'Slurp',
      Disallow: '',
    },
    {
      UserAgent: 'Teoma',
      Disallow: '',
    },
    {
      UserAgent: 'Gigabot',
      Disallow: '',
    },
    {
      UserAgent: 'Robozilla',
      Disallow: '',
    },
    {
      UserAgent: 'Nutch',
      Disallow: '',
    },
    {
      UserAgent: 'ia_archiver',
      Disallow: '',
    },
    {
      UserAgent: 'baiduspider',
      Disallow: '',
    },
    {
      UserAgent: 'naverbot',
      Disallow: '',
    },
    {
      UserAgent: 'yeti',
      Disallow: '',
    },
    {
      UserAgent: 'yahoo-mmcrawler',
      Disallow: '',
    },
    {
      UserAgent: 'psbot',
      Disallow: '',
    },
    {
      UserAgent: 'yahoo-blogs/v3.9',
      Disallow: '',
    },
    {
      UserAgent: '*',
      Disallow: '',
    },
    {
      Disallow: '/cgi-bin/',
      Sitemap: 'https://balifunncheer.com/sitemap.xml'
    },

    // UserAgent: '*',
    // Disallow: '/user',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://localhost:8000',
    // baseURL: 'https://pitchwind.dewatapartyshop.com/',
    // baseURL: 'https://pitchwind.balifunncheer.com/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  auth: {
    strategies: {
        //strategy "admin"
        admin: {
          scheme: 'local',
          token: {
            property: 'data.token',
            required: true,
            type: 'Bearer'
          },
          user: {
            // property: 'user',
            property: false,
            autoFetch: true
          },
          endpoints: {
            login: {
              url: '/api/v1/admin/login',
              method: 'post',
              propertyName: 'token'
            },
            logout: {
              url: '/api/v1/admin/logout',
              method: 'post'
            },
            user: {
              url: '/api/v1/admin/user',
              method: 'get',
              propertyName: 'user'
            }
          },
        },
  
        //strategy "customer"
        customer: {
          scheme: 'local',
          token: {
            property: 'token',
            required: true,
            type: 'Bearer'
          },
          user: {
            property: 'user',
            // autoFetch: true
          },
          endpoints: {
            login: {
              url: '/api/v1/customer/login',
              method: 'post',
              propertyName: 'token'
            },
            logout: {
              url: '/api/v1/customer/logout',
              method: 'post'
            },
            user: {
              url: '/api/v1/customer/profile',
              method: 'get',
              propertyName: 'user'
            }
          },
        },
    },
  },
}