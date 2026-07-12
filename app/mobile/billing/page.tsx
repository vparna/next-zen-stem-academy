'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Invoice {
  _id: string;
  invoiceNumber: string;
  items: { description: string; type: string; total: number }[];
  total: number;
  status: string;
  dueDate: string;
  paidDate?: string;
  recurringSchedule?: string;
}

export default function BillingPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchInvoices();
  }, [filter]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      
      const response = await fetch(`/api/childcare/billing?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setInvoices(data.invoices || []);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      paid: 'bg-green-100 text-green-700',
      sent: 'bg-blue-100 text-blue-700',
      overdue: 'bg-red-100 text-red-700',
      draft: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-gray-100 text-gray-500'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-md mx-auto pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push('/mobile')} className="text-2xl">←</button>
          <h1 className="text-2xl font-bold text-gray-800">Billing & Payments</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500 uppercase">Outstanding</p>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((sum, i) => sum + i.total, 0))}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <p className="text-xs text-gray-500 uppercase">Paid This Year</p>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0))}
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'sent', 'overdue', 'paid'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === f ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Invoice List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto"></div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">💰</div>
            <p className="text-gray-500">No invoices found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice._id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">{invoice.invoiceNumber}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{formatCurrency(invoice.total)}</p>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                      Pay Now
                    </button>
                  )}
                </div>
                {invoice.items.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {invoice.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs text-gray-500">
                        <span>{item.description}</span>
                        <span>{formatCurrency(item.total)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tax Statement Button */}
        <div className="mt-6">
          <button className="w-full bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📄</span>
              <div>
                <p className="font-medium text-gray-800">Download Tax Statement</p>
                <p className="text-xs text-gray-500">Get your annual childcare expense statement</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
