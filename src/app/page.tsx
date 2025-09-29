'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  PieChart, 
  Settings, 
  Plus, 
  Minus,
  Filter,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Download,
  Eye,
  MapPin,
  Clock,
  X,
  Edit,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Pie, Tooltip, Legend } from 'recharts'

// DADOS MOCK EXPANDIDOS PARA EXTRATO - MAIS REALISTAS E DETALHADOS
const initialMockTransactions = [
  // Dezembro 2024 - Transações Recentes
  { id: 1, type: 'expense', amount: 1250.00, category: 'Alimentação', description: 'Supermercado Extra', date: '2024-12-15', status: 'completed', location: 'Shopping Center Norte', time: '14:30', method: 'Cartão de Débito' },
  { id: 2, type: 'income', amount: 6500.00, category: 'Salário', description: 'Salário Dezembro', date: '2024-12-01', status: 'completed', location: 'Transferência Bancária', time: '08:00', method: 'PIX' },
  { id: 3, type: 'expense', amount: 850.00, category: 'Transporte', description: 'Combustível + Manutenção', date: '2024-12-14', status: 'completed', location: 'Posto Shell - Av. Paulista', time: '16:45', method: 'Cartão de Crédito' },
  { id: 4, type: 'expense', amount: 1800.00, category: 'Moradia', description: 'Aluguel + Condomínio', date: '2024-12-01', status: 'completed', location: 'Boleto Bancário', time: '09:15', method: 'Débito Automático' },
  { id: 5, type: 'income', amount: 800.00, category: 'Freelance', description: 'Projeto Website', date: '2024-12-10', status: 'completed', location: 'Transferência Online', time: '11:20', method: 'PIX' },
  { id: 6, type: 'expense', amount: 320.00, category: 'Lazer', description: 'Cinema + Jantar', date: '2024-12-12', status: 'completed', location: 'Shopping Iguatemi', time: '19:30', method: 'Cartão de Crédito' },
  { id: 7, type: 'expense', amount: 180.00, category: 'Saúde', description: 'Farmácia + Consulta', date: '2024-12-08', status: 'completed', location: 'Drogasil - Centro', time: '10:15', method: 'Cartão de Débito' },
  { id: 8, type: 'income', amount: 450.00, category: 'Freelance', description: 'Consultoria TI', date: '2024-12-05', status: 'completed', location: 'Transferência Online', time: '15:45', method: 'TED' },
  { id: 9, type: 'expense', amount: 280.00, category: 'Alimentação', description: 'Delivery + Restaurante', date: '2024-12-03', status: 'completed', location: 'iFood + Outback', time: '20:15', method: 'Cartão de Crédito' },
  { id: 10, type: 'expense', amount: 95.00, category: 'Transporte', description: 'Uber + Ônibus', date: '2024-12-02', status: 'completed', location: 'Centro - Zona Sul', time: '07:30', method: 'Cartão de Crédito' },
  
  // Transações Adicionais - Novembro 2024
  { id: 11, type: 'expense', amount: 450.00, category: 'Moradia', description: 'Conta de Luz', date: '2024-11-28', status: 'completed', location: 'Enel SP', time: '14:20', method: 'Débito Automático' },
  { id: 12, type: 'expense', amount: 120.00, category: 'Saúde', description: 'Academia', date: '2024-11-25', status: 'completed', location: 'Smart Fit', time: '18:00', method: 'Débito Automático' },
  { id: 13, type: 'income', amount: 200.00, category: 'Investimentos', description: 'Dividendos', date: '2024-11-20', status: 'completed', location: 'Corretora XP', time: '09:00', method: 'Transferência' },
  { id: 14, type: 'expense', amount: 75.00, category: 'Lazer', description: 'Streaming + Apps', date: '2024-11-15', status: 'completed', location: 'Netflix + Spotify', time: '12:00', method: 'Cartão de Crédito' },
  { id: 15, type: 'expense', amount: 340.00, category: 'Alimentação', description: 'Feira + Açougue', date: '2024-11-18', status: 'completed', location: 'Mercado Municipal', time: '08:30', method: 'Dinheiro' },
  { id: 16, type: 'expense', amount: 220.00, category: 'Transporte', description: 'Manutenção Carro', date: '2024-11-12', status: 'completed', location: 'Oficina do João', time: '13:45', method: 'PIX' },
  { id: 17, type: 'income', amount: 1200.00, category: 'Freelance', description: 'Desenvolvimento App', date: '2024-11-10', status: 'completed', location: 'Cliente Remoto', time: '16:30', method: 'PIX' },
  { id: 18, type: 'expense', amount: 89.90, category: 'Saúde', description: 'Medicamentos', date: '2024-11-08', status: 'completed', location: 'Drogaria São Paulo', time: '11:15', method: 'Cartão de Débito' },
  { id: 19, type: 'expense', amount: 156.00, category: 'Lazer', description: 'Show + Estacionamento', date: '2024-11-05', status: 'completed', location: 'Allianz Parque', time: '21:00', method: 'Cartão de Crédito' },
  { id: 20, type: 'expense', amount: 67.50, category: 'Alimentação', description: 'Lanche + Café', date: '2024-11-03', status: 'completed', location: 'Starbucks', time: '15:20', method: 'Cartão de Crédito' },
  
  // Outubro 2024
  { id: 21, type: 'income', amount: 6500.00, category: 'Salário', description: 'Salário Outubro', date: '2024-10-30', status: 'completed', location: 'Transferência Bancária', time: '08:00', method: 'PIX' },
  { id: 22, type: 'expense', amount: 1650.00, category: 'Moradia', description: 'Aluguel Outubro', date: '2024-10-28', status: 'completed', location: 'Boleto Bancário', time: '09:30', method: 'Débito Automático' },
  { id: 23, type: 'expense', amount: 890.00, category: 'Alimentação', description: 'Compras do Mês', date: '2024-10-25', status: 'completed', location: 'Carrefour', time: '16:00', method: 'Cartão de Débito' },
  { id: 24, type: 'expense', amount: 245.00, category: 'Transporte', description: 'Combustível', date: '2024-10-22', status: 'completed', location: 'Posto BR', time: '12:30', method: 'Cartão de Crédito' },
  { id: 25, type: 'income', amount: 350.00, category: 'Freelance', description: 'Design Gráfico', date: '2024-10-20', status: 'completed', location: 'Cliente Local', time: '14:15', method: 'PIX' },
  { id: 26, type: 'expense', amount: 125.00, category: 'Saúde', description: 'Consulta Médica', date: '2024-10-18', status: 'completed', location: 'Clínica São Luiz', time: '10:00', method: 'Cartão de Débito' },
  { id: 27, type: 'expense', amount: 78.90, category: 'Lazer', description: 'Livros + Revista', date: '2024-10-15', status: 'completed', location: 'Livraria Cultura', time: '17:45', method: 'Cartão de Crédito' },
  { id: 28, type: 'expense', amount: 189.00, category: 'Alimentação', description: 'Restaurante Japonês', date: '2024-10-12', status: 'completed', location: 'Liberdade', time: '19:30', method: 'Cartão de Crédito' },
  { id: 29, type: 'expense', amount: 45.00, category: 'Transporte', description: 'Estacionamento', date: '2024-10-10', status: 'completed', location: 'Shopping Morumbi', time: '14:00', method: 'Dinheiro' },
  { id: 30, type: 'income', amount: 150.00, category: 'Investimentos', description: 'Rendimento Poupança', date: '2024-10-08', status: 'completed', location: 'Banco do Brasil', time: '08:30', method: 'Transferência' },
  
  // Setembro 2024
  { id: 31, type: 'income', amount: 6500.00, category: 'Salário', description: 'Salário Setembro', date: '2024-09-30', status: 'completed', location: 'Transferência Bancária', time: '08:00', method: 'PIX' },
  { id: 32, type: 'expense', amount: 1650.00, category: 'Moradia', description: 'Aluguel Setembro', date: '2024-09-28', status: 'completed', location: 'Boleto Bancário', time: '09:30', method: 'Débito Automático' },
  { id: 33, type: 'expense', amount: 720.00, category: 'Alimentação', description: 'Supermercado Pão de Açúcar', date: '2024-09-25', status: 'completed', location: 'Vila Madalena', time: '15:30', method: 'Cartão de Débito' },
  { id: 34, type: 'expense', amount: 380.00, category: 'Transporte', description: 'Combustível + Pedágio', date: '2024-09-22', status: 'completed', location: 'Viagem Interior', time: '08:15', method: 'Cartão de Crédito' },
  { id: 35, type: 'income', amount: 950.00, category: 'Freelance', description: 'Sistema Web', date: '2024-09-20', status: 'completed', location: 'Cliente Corporativo', time: '16:00', method: 'TED' },
  { id: 36, type: 'expense', amount: 167.50, category: 'Saúde', description: 'Exames Laboratoriais', date: '2024-09-18', status: 'completed', location: 'Laboratório Fleury', time: '07:30', method: 'Cartão de Débito' },
  { id: 37, type: 'expense', amount: 234.00, category: 'Lazer', description: 'Teatro + Jantar', date: '2024-09-15', status: 'completed', location: 'Centro Cultural', time: '20:00', method: 'Cartão de Crédito' },
  { id: 38, type: 'expense', amount: 145.80, category: 'Alimentação', description: 'Padaria + Hortifruti', date: '2024-09-12', status: 'completed', location: 'Comércio Local', time: '09:45', method: 'PIX' },
  { id: 39, type: 'expense', amount: 89.00, category: 'Transporte', description: 'Aplicativo de Transporte', date: '2024-09-10', status: 'completed', location: 'Aeroporto - Casa', time: '22:30', method: 'Cartão de Crédito' },
  { id: 40, type: 'income', amount: 275.00, category: 'Investimentos', description: 'Venda de Ações', date: '2024-09-08', status: 'completed', location: 'Corretora Rico', time: '11:15', method: 'Transferência' },
]

const initialMockCategories = [
  { id: 1, name: 'Alimentação', budget: 2000, spent: 1870, color: '#000000', icon: '🍽️' },
  { id: 2, name: 'Transporte', budget: 1200, spent: 945, color: '#333333', icon: '🚗' },
  { id: 3, name: 'Moradia', budget: 2500, spent: 2250, color: '#666666', icon: '🏠' },
  { id: 4, name: 'Lazer', budget: 600, spent: 395, color: '#999999', icon: '🎬' },
  { id: 5, name: 'Saúde', budget: 500, spent: 300, color: '#CCCCCC', icon: '⚕️' },
  { id: 6, name: 'Salário', budget: 0, spent: 0, color: '#4CAF50', icon: '💼' },
  { id: 7, name: 'Freelance', budget: 0, spent: 0, color: '#2196F3', icon: '💻' },
  { id: 8, name: 'Investimentos', budget: 0, spent: 0, color: '#FF9800', icon: '📈' },
]

const monthlyData = [
  { month: 'Jul', income: 7200, expenses: 5800 },
  { month: 'Ago', income: 6800, expenses: 5400 },
  { month: 'Set', income: 7500, expenses: 6200 },
  { month: 'Out', income: 7100, expenses: 5900 },
  { month: 'Nov', income: 6900, expenses: 5600 },
  { month: 'Dez', income: 7950, expenses: 6760 },
]

export default function FinancialPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState('30-days')
  const [customDateFrom, setCustomDateFrom] = useState('')
  const [customDateTo, setCustomDateTo] = useState('')
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] = useState(false)
  
  // Estado para gerenciar as transações (agora dinâmico)
  const [mockTransactions, setMockTransactions] = useState(initialMockTransactions)
  
  // Estado para gerenciar as categorias (agora dinâmico)
  const [mockCategories, setMockCategories] = useState(initialMockCategories)
  
  // Estados do formulário de nova transação
  const [newTransaction, setNewTransaction] = useState({
    type: '',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Data atual por padrão
    location: '',
    method: ''
  })

  // Estados do formulário de nova categoria
  const [newCategory, setNewCategory] = useState({
    name: '',
    budget: '',
    color: '#000000',
    icon: '💰'
  })

  // Função para resetar o formulário de transação
  const resetTransactionForm = () => {
    setNewTransaction({
      type: '',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      method: ''
    })
  }

  // Função para resetar o formulário de categoria
  const resetCategoryForm = () => {
    setNewCategory({
      name: '',
      budget: '',
      color: '#000000',
      icon: '💰'
    })
  }

  // Função para adicionar nova transação
  const handleAddTransaction = () => {
    // Validação básica
    if (!newTransaction.type || !newTransaction.amount || !newTransaction.category || !newTransaction.description) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Criar nova transação
    const transaction = {
      id: Math.max(...mockTransactions.map(t => t.id)) + 1,
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount.replace(',', '.')),
      category: newTransaction.category,
      description: newTransaction.description,
      date: newTransaction.date,
      status: 'completed',
      location: newTransaction.location || 'Local não informado',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      method: newTransaction.method || 'Não informado'
    }

    // Adicionar a nova transação no início da lista (mais recente primeiro)
    setMockTransactions(prev => [transaction, ...prev])
    
    // Fechar modal e resetar formulário
    setIsAddTransactionOpen(false)
    resetTransactionForm()
    
    // Feedback visual (opcional - pode ser substituído por toast)
    alert(`Transação "${transaction.description}" adicionada com sucesso!`)
  }

  // Função para adicionar nova categoria
  const handleAddCategory = () => {
    // Validação básica
    if (!newCategory.name || !newCategory.budget) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Verificar se categoria já existe
    const categoryExists = mockCategories.some(cat => 
      cat.name.toLowerCase() === newCategory.name.toLowerCase()
    )

    if (categoryExists) {
      alert('Já existe uma categoria com este nome.')
      return
    }

    // Criar nova categoria
    const category = {
      id: Math.max(...mockCategories.map(c => c.id)) + 1,
      name: newCategory.name,
      budget: parseFloat(newCategory.budget.replace(',', '.')),
      spent: 0, // Nova categoria começa com gasto zero
      color: newCategory.color,
      icon: newCategory.icon
    }

    // Adicionar a nova categoria
    setMockCategories(prev => [...prev, category])
    
    // Fechar modal e resetar formulário
    setIsAddCategoryOpen(false)
    resetCategoryForm()
    
    // Feedback visual
    alert(`Categoria "${category.name}" criada com sucesso!`)
  }

  // Função para filtrar transações por data
  const getFilteredTransactions = () => {
    const now = new Date()
    let startDate = new Date()

    switch (dateFilter) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case '7-days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30-days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90-days':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case 'this-year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      case 'custom':
        if (customDateFrom && customDateTo) {
          startDate = new Date(customDateFrom)
          const endDate = new Date(customDateTo)
          return mockTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)
            const matchesDate = transactionDate >= startDate && transactionDate <= endDate
            const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
            const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
            const matchesSearch = searchTerm === '' || 
              transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
              transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesDate && matchesType && matchesCategory && matchesSearch
          })
        }
        return mockTransactions.filter(transaction => {
          const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
          const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
          const matchesSearch = searchTerm === '' || 
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
          return matchesType && matchesCategory && matchesSearch
        })
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    return mockTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      const matchesDate = transactionDate >= startDate
      const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
      const matchesSearch = searchTerm === '' || 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesDate && matchesType && matchesCategory && matchesSearch
    })
  }

  // CÁLCULOS PRINCIPAIS - Usando todas as transações para o dashboard principal
  const allTransactions = mockTransactions
  const totalIncome = allTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = allTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpenses

  // Para o extrato, usar transações filtradas
  const filteredTransactions = getFilteredTransactions()
  const filteredIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const filteredExpenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const filteredBalance = filteredIncome - filteredExpenses

  // Preparar dados para o gráfico de pizza
  const pieChartData = mockCategories.map(category => ({
    name: category.name,
    value: category.spent,
    color: category.color
  }))

  // Função para renderizar tooltip customizado
  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-black">{data.name}</p>
          <p className="text-sm text-gray-600">
            R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-500">
            {((data.value / pieChartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% do total
          </p>
        </div>
      )
    }
    return null
  }

  // Função para abrir detalhes da transação
  const openTransactionDetail = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionDetailOpen(true)
  }

  // Função para obter ícone da categoria
  const getCategoryIcon = (category: string) => {
    const categoryData = mockCategories.find(cat => cat.name === category)
    return categoryData?.icon || '💰'
  }

  // Lista de ícones disponíveis para categorias
  const availableIcons = [
    '💰', '🍽️', '🚗', '🏠', '🎬', '⚕️', '💼', '💻', '📈', '🛒', 
    '✈️', '🎓', '👕', '📱', '🏋️', '🎵', '📚', '🎮', '🍕', '☕'
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500">Este mês</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-500">Este mês</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Economia</CardTitle>
            <Target className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0.0'}%
            </div>
            <p className="text-xs text-gray-500">Meta: 20%</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Fluxo de Caixa Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Bar dataKey="income" fill="#000000" name="Receitas" />
                <Bar dataKey="expenses" fill="#666666" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Gastos por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={renderTooltip} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color, fontSize: '12px' }}>
                      {value}
                    </span>
                  )}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            {/* Resumo das categorias */}
            <div className="mt-4 space-y-2">
              {pieChartData.map((category, index) => {
                const percentage = ((category.value / pieChartData.reduce((sum, item) => sum + item.value, 0)) * 100)
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-black">
                        R$ {category.value.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-gray-500 ml-2">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orçamentos */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Controle de Orçamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCategories.map((category) => {
              const percentage = (category.spent / category.budget) * 100
              const isOverBudget = percentage > 100
              
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-black">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        R$ {category.spent.toLocaleString('pt-BR')} / R$ {category.budget.toLocaleString('pt-BR')}
                      </span>
                      {isOverBudget ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-500">
                    {percentage.toFixed(1)}% do orçamento utilizado
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-black">Extrato Completo</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-300 text-black hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-2" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  Adicionar Transação
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">Tipo *</Label>
                    <Select value={newTransaction.type} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">💰 Receita</SelectItem>
                        <SelectItem value="expense">💸 Despesa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount" className="text-sm font-medium">Valor *</Label>
                    <Input 
                      id="amount" 
                      placeholder="0,00" 
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Categoria *</Label>
                  <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description" className="text-sm font-medium">Descrição *</Label>
                  <Input 
                    id="description" 
                    placeholder="Ex: Supermercado, Combustível, Salário..." 
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Data</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Local</Label>
                  <Input 
                    id="location" 
                    placeholder="Ex: Shopping Center, Posto Shell..." 
                    value={newTransaction.location}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="method" className="text-sm font-medium">Método de Pagamento</Label>
                  <Select value={newTransaction.method} onValueChange={(value) => setNewTransaction(prev => ({ ...prev, method: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PIX">PIX</SelectItem>
                      <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                      <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="TED">TED</SelectItem>
                      <SelectItem value="Transferência">Transferência</SelectItem>
                      <SelectItem value="Débito Automático">Débito Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddTransactionOpen(false)
                      resetTransactionForm()
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleAddTransaction}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                    disabled={!newTransaction.type || !newTransaction.amount || !newTransaction.category || !newTransaction.description}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  * Campos obrigatórios
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filtros Aprimorados */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros Avançados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Barra de Pesquisa */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Pesquisar por descrição ou categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Filtro de Período */}
              <div className="flex-1">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Período</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                  <Button
                    variant={dateFilter === 'today' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('today')}
                    className={dateFilter === 'today' ? 'bg-black text-white' : 'border-gray-300 text-black hover:bg-gray-50'}
                  >
                    Hoje
                  </Button>
                  <Button
                    variant={dateFilter === '7-days' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('7-days')}
                    className={dateFilter === '7-days' ? 'bg-black text-white' : 'border-gray-300 text-black hover:bg-gray-50'}
                  >
                    7 dias
                  </Button>
                  <Button
                    variant={dateFilter === '30-days' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('30-days')}
                    className={dateFilter === '30-days' ? 'bg-black text-white' : 'border-gray-300 text-black hover:bg-gray-50'}
                  >
                    30 dias
                  </Button>
                  <Button
                    variant={dateFilter === '90-days' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('90-days')}
                    className={dateFilter === '90-days' ? 'bg-black text-white' : 'border-gray-300 text-black hover:bg-gray-50'}
                  >
                    90 dias
                  </Button>
                  <Button
                    variant={dateFilter === 'this-year' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDateFilter('this-year')}
                    className={dateFilter === 'this-year' ? 'bg-black text-white' : 'border-gray-300 text-black hover:bg-gray-50'}
                  >
                    Este ano
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={dateFilter === 'custom' ? 'default' : 'outline'}
                        size="sm"
                        className={dateFilter === 'custom' ? 'bg-black text-white' : 'border-gray-300 text-black hover:bg-gray-50'}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Personalizado
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="end">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="date-from">Data inicial</Label>
                          <Input
                            id="date-from"
                            type="date"
                            value={customDateFrom}
                            onChange={(e) => setCustomDateFrom(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-to">Data final</Label>
                          <Input
                            id="date-to"
                            type="date"
                            value={customDateTo}
                            onChange={(e) => setCustomDateTo(e.target.value)}
                          />
                        </div>
                        <Button
                          onClick={() => setDateFilter('custom')}
                          className="w-full bg-black text-white hover:bg-gray-800"
                          disabled={!customDateFrom || !customDateTo}
                        >
                          Aplicar Período
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Filtros de Tipo e Categoria */}
              <div className="flex gap-4">
                <div className="w-32">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Tipo</Label>
                  <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="income">Receitas</SelectItem>
                      <SelectItem value="expense">Despesas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Categoria</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Resumo do Filtro */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Período:</span>
                  <Badge variant="outline" className="border-gray-300">
                    {dateFilter === 'today' && 'Hoje'}
                    {dateFilter === '7-days' && 'Últimos 7 dias'}
                    {dateFilter === '30-days' && 'Últimos 30 dias'}
                    {dateFilter === '90-days' && 'Últimos 90 dias'}
                    {dateFilter === 'this-year' && 'Este ano'}
                    {dateFilter === 'custom' && customDateFrom && customDateTo && 
                      `${new Date(customDateFrom).toLocaleDateString('pt-BR')} - ${new Date(customDateTo).toLocaleDateString('pt-BR')}`}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Transações:</span>
                  <Badge className="bg-black text-white">
                    {filteredTransactions.length}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Receitas:</span>
                  <Badge variant="outline" className="border-green-500 text-green-700">
                    +R$ {filteredIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Despesas:</span>
                  <Badge variant="outline" className="border-red-500 text-red-700">
                    -R$ {filteredExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Saldo:</span>
                  <Badge 
                    variant="outline" 
                    className={`border-2 ${filteredBalance >= 0 ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700'}`}
                  >
                    {filteredBalance >= 0 ? '+' : ''}R$ {filteredBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Transações */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Nenhuma transação encontrada</p>
              <p className="text-sm">Tente ajustar os filtros ou adicionar uma nova transação</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                     onClick={() => openTransactionDetail(transaction)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full text-lg ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {getCategoryIcon(transaction.category)}
                      </div>
                      <div>
                        <p className="font-medium text-black">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{transaction.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {transaction.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {transaction.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-lg ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                        <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                        <Eye className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Detalhes da Transação */}
      <Dialog open={isTransactionDetailOpen} onOpenChange={setIsTransactionDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedTransaction && getCategoryIcon(selectedTransaction.category)}</span>
              Detalhes da Transação
            </DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <p className={`text-3xl font-bold ${
                  selectedTransaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.type === 'income' ? '+' : '-'}R$ {selectedTransaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-lg font-medium text-black mt-2">{selectedTransaction.description}</p>
              </div>
              
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria:</span>
                  <span className="font-medium text-black">{selectedTransaction.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-medium text-black">
                    {new Date(selectedTransaction.date).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-medium text-black">{selectedTransaction.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Local:</span>
                  <span className="font-medium text-black">{selectedTransaction.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Método:</span>
                  <span className="font-medium text-black">{selectedTransaction.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">
                    ✓ Concluída
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Categorias e Orçamentos</h2>
        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Criar Nova Categoria
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category-name" className="text-sm font-medium">Nome da Categoria *</Label>
                <Input 
                  id="category-name" 
                  placeholder="Ex: Educação, Pets, Viagem..." 
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="category-budget" className="text-sm font-medium">Orçamento Mensal *</Label>
                <Input 
                  id="category-budget" 
                  placeholder="0,00" 
                  value={newCategory.budget}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="category-icon" className="text-sm font-medium">Ícone</Label>
                <div className="grid grid-cols-10 gap-2 mt-2 p-3 border border-gray-200 rounded-lg max-h-32 overflow-y-auto">
                  {availableIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                      className={`p-2 text-lg hover:bg-gray-100 rounded transition-colors ${
                        newCategory.icon === icon ? 'bg-black text-white' : 'bg-gray-50'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Ícone selecionado: {newCategory.icon}</p>
              </div>
              
              <div>
                <Label htmlFor="category-color" className="text-sm font-medium">Cor</Label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="color"
                    id="category-color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <Input 
                      value={newCategory.color}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
              
              {/* Preview da categoria */}
              <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-full text-lg bg-white"
                    style={{ borderColor: newCategory.color, borderWidth: '2px', borderStyle: 'solid' }}
                  >
                    {newCategory.icon}
                  </div>
                  <div>
                    <p className="font-medium text-black">{newCategory.name || 'Nome da Categoria'}</p>
                    <p className="text-sm text-gray-600">
                      Orçamento: R$ {newCategory.budget || '0,00'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddCategoryOpen(false)
                    resetCategoryForm()
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleAddCategory}
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  disabled={!newCategory.name || !newCategory.budget}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Categoria
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                * Campos obrigatórios
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCategories.map((category) => {
          const percentage = category.budget > 0 ? (category.spent / category.budget) * 100 : 0
          const remaining = category.budget - category.spent
          
          return (
            <Card key={category.id} className="border-gray-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-black flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    {category.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gasto</span>
                    <span className="font-medium text-black">
                      R$ {category.spent.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orçamento</span>
                    <span className="font-medium text-black">
                      R$ {category.budget.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  {category.budget > 0 && (
                    <>
                      <Progress 
                        value={Math.min(percentage, 100)} 
                        className="h-2" 
                        style={{ 
                          backgroundColor: `${category.color}20`,
                        }}
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {percentage > 100 ? 'Excedeu em' : 'Restante'}
                        </span>
                        <span className={`font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          R$ {Math.abs(remaining).toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        {percentage.toFixed(1)}% do orçamento utilizado
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Estatísticas das Categorias */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-black">Resumo das Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-black">{mockCategories.length}</p>
              <p className="text-sm text-gray-600">Total de Categorias</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {mockCategories.filter(cat => cat.budget > 0 && (cat.spent / cat.budget) <= 1).length}
              </p>
              <p className="text-sm text-gray-600">Dentro do Orçamento</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {mockCategories.filter(cat => cat.budget > 0 && (cat.spent / cat.budget) > 1).length}
              </p>
              <p className="text-sm text-gray-600">Acima do Orçamento</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Configurações</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue="João Silva" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="joao@email.com" />
            </div>
            <Button className="bg-black text-white hover:bg-gray-800">
              Salvar Alterações
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Metas Financeiras</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="savings-goal">Meta de Economia Mensal (%)</Label>
              <Input id="savings-goal" type="number" defaultValue="20" />
            </div>
            <div>
              <Label htmlFor="emergency-fund">Fundo de Emergência (R$)</Label>
              <Input id="emergency-fund" defaultValue="10000" />
            </div>
            <Button className="bg-black text-white hover:bg-gray-800">
              Atualizar Metas
            </Button>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Notificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="budget-alerts">Alertas de Orçamento</Label>
              <input type="checkbox" id="budget-alerts" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="monthly-reports">Relatórios Mensais</Label>
              <input type="checkbox" id="monthly-reports" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="goal-reminders">Lembretes de Metas</Label>
              <input type="checkbox" id="goal-reminders" className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Exportar Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Exporte seus dados financeiros para análise externa
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-50">
                Exportar CSV
              </Button>
              <Button variant="outline" className="w-full border-gray-300 text-black hover:bg-gray-50">
                Exportar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-black">FinanceControl</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mês</SelectItem>
                  <SelectItem value="year">Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Extrato</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center space-x-2">
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Categorias</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Configurações</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>
          <TabsContent value="transactions">
            {renderTransactions()}
          </TabsContent>
          <TabsContent value="categories">
            {renderCategories()}
          </TabsContent>
          <TabsContent value="settings">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}