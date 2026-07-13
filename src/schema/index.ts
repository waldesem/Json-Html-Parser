import type { Schemas } from '@/types'

const localStr = (str: string) =>
  str ? new Date(str).toLocaleDateString() : ''

export const schema: Schemas[] = [
  { keys: ['positionName', 'department'], attr: 'font-semibold' },
  {
    keys: ['lastName', 'firstName', 'midName'],
    attr: 'font-bold text-upper text-underline',
  },
  {
    key: 'birthday',
    label: 'Дата рождения',
    foo: (row: string) => localStr(row),
  },
  { key: 'birthplace', label: 'Место рождения' },
  { key: 'citizen', label: 'Гражданство' },
  { key: 'additionalCitizenship', label: 'Двойное гражданство' },
  { key: 'snils', label: 'СНИЛС' },
  { key: 'inn', label: 'ИНН' },
  { key: 'maritalStatus', label: 'Семейное положение' },
  { label: 'Адрес' },
  { key: 'regAddress', label: 'Адрес регистрации' },
  { key: 'validAddress', label: 'Адрес проживания' },
  { label: 'Контакты' },
  { key: 'contactPhone', label: 'Телефон' },
  { key: 'email', label: 'Email' },
  { label: 'Документы' },
  { key: 'passportSerial', label: 'Серия документа' },
  { key: 'passportNumber', label: 'Номер документа' },
  { key: 'passportIssuedBy', label: 'Кем выдан' },
  {
    key: 'passportIssueDate',
    label: 'Дата',
    foo: (row: string) => localStr(row),
  },
  {
    key: 'education',
    label: 'Образование',
    items: [
      { key: 'educationType', label: 'Уровень', attr: 'font-medium' },
      { key: 'institutionName', label: 'Учебное заведение' },
      { key: 'endYear', label: 'Год окончания' },
      { key: 'specialty', label: 'Специальность' },
    ],
  },
  {
    key: 'experience',
    label: 'Работа',
    items: [
      { key: 'name', label: 'Место работы', attr: 'font-medium' },
      { key: 'beginDate', label: 'Приём', foo: (row: string) => localStr(row) },
      {
        key: 'endDate',
        label: 'Увольнение',
        foo: (row: string) => localStr(row),
      },
      {
        key: 'currentJob',
        label: 'Текущая работа',
        foo: (row: string) => (Boolean(row) ? 'Да' : 'Нет'),
      },
      { key: 'position', label: 'Должность' },
      { key: 'address', label: 'Адрес' },
      { key: 'fireReason', label: 'Причина увольнения' },
    ],
  },
  {
    key: 'nameWasChanged',
    label: 'Перемена имени',
    items: [
      { key: 'lastNameBeforeChange', label: 'Фамилия' },
      { key: 'firstNameBeforeChange', label: 'Имя' },
      { key: 'midNameBeforeChange', label: 'Отчество' },
      { key: 'changed', label: 'Год изменения' },
      { key: 'reason', label: 'Причина' },
    ],
  },
  {
    key: 'organizations',
    label: 'Участие в коммерческой деятельности',
    items: [
      { key: 'name', label: 'Название', attr: 'font-medium' },
      { key: 'activity', label: 'Вид деятельности' },
      { key: 'inn', label: 'ИНН' },
    ],
  },
]
