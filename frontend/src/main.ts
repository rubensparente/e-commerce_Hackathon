// frontend/src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import router from './router'
import App from './App.vue'

// Importar componentes do PrimeVue para registro global
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import Calendar from 'primevue/calendar'
import Password from 'primevue/password'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import AutoComplete from 'primevue/autocomplete'
import ProgressSpinner from 'primevue/progressspinner'
import ProgressBar from 'primevue/progressbar'
import Badge from 'primevue/badge'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import TabMenu from 'primevue/tabmenu'
import Tooltip from 'primevue/tooltip'
import SplitButton from 'primevue/splitbutton'
import FileUpload from 'primevue/fileupload'
import Chart from 'primevue/chart'
import Tag from 'primevue/tag'
import Chip from 'primevue/chip'
import Skeleton from 'primevue/skeleton'
import Divider from 'primevue/divider'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Panel from 'primevue/panel'
import Fieldset from 'primevue/fieldset'

// Importar estilos do PrimeVue
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css'

// Importar Tailwind
import './style.css'

const app = createApp(App)

// Registrar componentes globalmente
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('InputNumber', InputNumber)
app.component('Dropdown', Dropdown)
app.component('Checkbox', Checkbox)
app.component('RadioButton', RadioButton)
app.component('Calendar', Calendar)
app.component('Password', Password)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Card', Card)
app.component('Dialog', Dialog)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)
app.component('AutoComplete', AutoComplete)
app.component('ProgressSpinner', ProgressSpinner)
app.component('ProgressBar', ProgressBar)
app.component('Badge', Badge)
app.component('Avatar', Avatar)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('TabMenu', TabMenu)
app.component('SplitButton', SplitButton)
app.component('FileUpload', FileUpload)
app.component('Chart', Chart)
app.component('Tag', Tag)
app.component('Chip', Chip)
app.component('Skeleton', Skeleton)
app.component('Divider', Divider)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Panel', Panel)
app.component('Fieldset', Fieldset)

// Registrar diretivas
app.directive('tooltip', Tooltip)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService, {
  default: {
    header: 'Confirmar',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Não',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-outlined'
  }
})

app.mount('#app')