// frontend/src/plugins/primevue.ts
import type { App, Plugin } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Aura from '@primeuix/themes/aura'

// Importação de componentes PrimeVue
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
// import Chart from 'primevue/chart'  // REMOVIDO - não usado
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

// Interface para componentes registrados
interface ComponentRegistration {
  name: string
  component: object
}

// Lista de componentes para registrar globalmente
const components: ComponentRegistration[] = [
  { name: 'Button', component: Button },
  { name: 'InputText', component: InputText },
  { name: 'Textarea', component: Textarea },
  { name: 'InputNumber', component: InputNumber },
  { name: 'Dropdown', component: Dropdown },
  { name: 'Checkbox', component: Checkbox },
  { name: 'RadioButton', component: RadioButton },
  { name: 'Calendar', component: Calendar },
  { name: 'Password', component: Password },
  { name: 'DataTable', component: DataTable },
  { name: 'Column', component: Column },
  { name: 'Card', component: Card },
  { name: 'Dialog', component: Dialog },
  { name: 'Toast', component: Toast },
  { name: 'ConfirmDialog', component: ConfirmDialog },
  { name: 'AutoComplete', component: AutoComplete },
  { name: 'ProgressSpinner', component: ProgressSpinner },
  { name: 'ProgressBar', component: ProgressBar },
  { name: 'Badge', component: Badge },
  { name: 'Avatar', component: Avatar },
  { name: 'Menu', component: Menu },
  { name: 'Menubar', component: Menubar },
  { name: 'TabMenu', component: TabMenu },
  { name: 'SplitButton', component: SplitButton },
  { name: 'FileUpload', component: FileUpload },
  // { name: 'Chart', component: Chart },  // REMOVIDO
  { name: 'Tag', component: Tag },
  { name: 'Chip', component: Chip },
  { name: 'Skeleton', component: Skeleton },
  { name: 'Divider', component: Divider },
  { name: 'Accordion', component: Accordion },
  { name: 'AccordionTab', component: AccordionTab },
  { name: 'TabView', component: TabView },
  { name: 'TabPanel', component: TabPanel },
  { name: 'Panel', component: Panel },
  { name: 'Fieldset', component: Fieldset }
]

const PrimeVuePlugin: Plugin = {
  install(app: App): void {
    // Configurar PrimeVue com tema Aura
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      },
      ripple: true,
      inputStyle: 'outlined'
    })
    
    // Configurar serviços
    app.use(ToastService)
    app.use(ConfirmationService)
    
    // Registrar todos os componentes globalmente
    components.forEach(({ name, component }) => {
      app.component(name, component)
    })
    
    // Registrar diretivas
    app.directive('tooltip', Tooltip)
  }
}

export default PrimeVuePlugin