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
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

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
        {/* Header - Handled by MobileLayout */}
        <div className="mb-4 px-2">
          <p className="text-gray-500 text-sm">Manage your invoices and payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-5 shadow-[0_8px_30px_rgba(225,29,72,0.2)] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1">Outstanding</p>
            <p className="text-2xl font-bold tracking-tight">
              {formatCurrency(invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((sum, i) => sum + i.total, 0))}
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 shadow-[0_8px_30px_rgba(16,185,129,0.2)] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1">Paid This Year</p>
            <p className="text-2xl font-bold tracking-tight">
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
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 p-10 text-center shadow-sm">
            <div className="text-5xl mb-4 opacity-50 grayscale">💳</div>
            <p className="text-gray-500 font-medium text-sm">No invoices found for this filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice._id} className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 p-5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.08)] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">{invoice.invoiceNumber}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-800 tracking-tight">{formatCurrency(invoice.total)}</p>
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mt-1">
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                    <button 
                      onClick={() => setSelectedInvoice(invoice._id)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
                {invoice.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100/80 bg-gray-50/50 -mx-5 -mb-5 p-5 rounded-b-3xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Breakdown</p>
                    {invoice.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs font-medium text-gray-600 mb-2 last:mb-0">
                        <span>{item.description}</span>
                        <span className="text-gray-800 font-bold">{formatCurrency(item.total)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Payment Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
            <div className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-10 animate-in slide-in-from-bottom">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Payment Method</h3>
                <button onClick={() => setSelectedInvoice(null)} className="text-gray-400 text-xl">✕</button>
              </div>
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center gap-4 p-4 border-2 border-emerald-500 rounded-xl bg-emerald-50">
                  <span className="text-2xl">💳</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Credit / Debit Card</p>
                    <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-emerald-300">
                  <span className="text-2xl">🏦</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Bank Transfer (ACH)</p>
                    <p className="text-xs text-gray-500">Direct from your bank account</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-emerald-300">
                  <span className="text-2xl">📱</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">Digital Wallet</p>
                    <p className="text-xs text-gray-500">Apple Pay, Google Pay</p>
                  </div>
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mb-4">
                Amount: {formatCurrency(invoices.find(i => i._id === selectedInvoice)?.total || 0)}
              </p>
              <button 
                onClick={() => {
                  alert('Payment processing will be available soon. Please contact the center for payment options.');
                  setSelectedInvoice(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold shadow-lg"
              >
                Proceed to Pay
              </button>
            </div>
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
