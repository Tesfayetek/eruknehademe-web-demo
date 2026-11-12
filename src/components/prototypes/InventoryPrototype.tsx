import React, { useState } from 'react';
import { Package, ArrowDownRight, ArrowUpRight, ArrowLeftRight, RotateCcw, FileText, Truck, Search, Plus, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  reorderLevel: number;
  warehouseLocation: string;
}

interface BinCardRecord {
  id: string;
  date: string;
  sku: string;
  action: 'STOCK_IN' | 'STOCK_OUT' | 'TRANSFER' | 'RETURN';
  quantity: number;
  balance: number;
  reference: string;
  note: string;
}

const INITIAL_ITEMS: InventoryItem[] = [
  { id: 'item-1', sku: 'SKU-ELEC-401', name: 'Industrial Voltage Regulator 48V', category: 'Electrical', quantity: 142, unit: 'Units', costPerUnit: 185.0, supplier: 'Apex Power Systems', reorderLevel: 50, warehouseLocation: 'Aisle 3 / Shelf B-02' },
  { id: 'item-2', sku: 'SKU-NET-109', name: 'Cat6 Shielded Patch Cable 100m', category: 'Networking', quantity: 38, unit: 'Rolls', costPerUnit: 42.5, supplier: 'Addis Cable Corp', reorderLevel: 40, warehouseLocation: 'Aisle 1 / Shelf A-11' },
  { id: 'item-3', sku: 'SKU-HARD-772', name: 'Tempered Carbon Fastener M8 (100pk)', category: 'Hardware', quantity: 320, unit: 'Boxes', costPerUnit: 14.0, supplier: 'Global Metal Supplies', reorderLevel: 100, warehouseLocation: 'Aisle 4 / Shelf D-05' },
  { id: 'item-4', sku: 'SKU-SEN-303', name: 'Thermal Optical Sensor Module', category: 'Sensors', quantity: 19, unit: 'Units', costPerUnit: 310.0, supplier: 'OptoSense Dynamics', reorderLevel: 25, warehouseLocation: 'Aisle 2 / Bin C-01' },
  { id: 'item-5', sku: 'SKU-BAT-882', name: 'Lithium Ferro Phosphate 12V Battery Pack', category: 'Power', quantity: 64, unit: 'Units', costPerUnit: 450.0, supplier: 'Apex Power Systems', reorderLevel: 30, warehouseLocation: 'Secure Vault / Shelf V-02' }
];

const INITIAL_RECORDS: BinCardRecord[] = [
  { id: 'bc-1', date: '2026-03-09 14:20', sku: 'SKU-ELEC-401', action: 'STOCK_IN', quantity: 50, balance: 142, reference: 'GRN-9842', note: 'Received from supplier batch #8812' },
  { id: 'bc-2', date: '2026-03-08 10:15', sku: 'SKU-NET-109', action: 'STOCK_OUT', quantity: 12, balance: 38, reference: 'DISPATCH-221', note: 'Project installation at Site 4' },
  { id: 'bc-3', date: '2026-03-07 16:40', sku: 'SKU-SEN-303', action: 'STOCK_OUT', quantity: 6, balance: 19, reference: 'DISPATCH-219', note: 'Maintenance department allocation' },
  { id: 'bc-4', date: '2026-03-05 11:00', sku: 'SKU-HARD-772', action: 'RETURN', quantity: 20, balance: 320, reference: 'RET-041', note: 'Surplus returned from fabrication workshop' }
];

export const InventoryPrototype: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'items' | 'stockin' | 'stockout' | 'transfer' | 'returns' | 'bincard'>('items');
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [records, setRecords] = useState<BinCardRecord[]>(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form states for Stock In / Out
  const [selectedSku, setSelectedSku] = useState(INITIAL_ITEMS[0].sku);
  const [transQuantity, setTransQuantity] = useState<number>(10);
  const [transReference, setTransReference] = useState('');
  const [transNote, setTransNote] = useState('');
  const [transferTarget, setTransferTarget] = useState('Secondary Warehouse Hawassa');

  // Handle Stock In
  const handleStockIn = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(transQuantity);
    if (qty <= 0) return;

    setItems(items.map(it => {
      if (it.sku === selectedSku) {
        const newQty = it.quantity + qty;
        const newRecord: BinCardRecord = {
          id: `bc-${Date.now()}`,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          sku: selectedSku,
          action: 'STOCK_IN',
          quantity: qty,
          balance: newQty,
          reference: transReference || 'GRN-AUTO',
          note: transNote || 'Direct shipment intake'
        };
        setRecords([newRecord, ...records]);
        return { ...it, quantity: newQty };
      }
      return it;
    }));
    setTransReference('');
    setTransNote('');
    alert(`Success: ${qty} units added to ${selectedSku} via FIFO ledger.`);
  };

  // Handle Stock Out
  const handleStockOut = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(transQuantity);
    if (qty <= 0) return;

    const targetItem = items.find(it => it.sku === selectedSku);
    if (!targetItem || targetItem.quantity < qty) {
      alert('Error: Insufficient stock available for this issue.');
      return;
    }

    setItems(items.map(it => {
      if (it.sku === selectedSku) {
        const newQty = it.quantity - qty;
        const newRecord: BinCardRecord = {
          id: `bc-${Date.now()}`,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          sku: selectedSku,
          action: 'STOCK_OUT',
          quantity: qty,
          balance: newQty,
          reference: transReference || 'DISPATCH-AUTO',
          note: transNote || 'Warehouse fulfillment dispatch'
        };
        setRecords([newRecord, ...records]);
        return { ...it, quantity: newQty };
      }
      return it;
    }));
    setTransReference('');
    setTransNote('');
    alert(`Stock out completed: ${qty} units deducted under FIFO.`);
  };

  // Handle Transfer
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(transQuantity);
    if (qty <= 0) return;

    const targetItem = items.find(it => it.sku === selectedSku);
    if (!targetItem || targetItem.quantity < qty) {
      alert('Error: Insufficient stock to transfer.');
      return;
    }

    setItems(items.map(it => {
      if (it.sku === selectedSku) {
        const newQty = it.quantity - qty;
        const newRecord: BinCardRecord = {
          id: `bc-${Date.now()}`,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16),
          sku: selectedSku,
          action: 'TRANSFER',
          quantity: qty,
          balance: newQty,
          reference: `TRF-${Math.floor(Math.random() * 8999 + 1000)}`,
          note: `Transferred to ${transferTarget}`
        };
        setRecords([newRecord, ...records]);
        return { ...it, quantity: newQty };
      }
      return it;
    }));
    alert(`Transferred ${qty} units to ${transferTarget}.`);
  };

  const filteredItems = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalInventoryValue = items.reduce((acc, curr) => acc + (curr.quantity * curr.costPerUnit), 0);
  const lowStockCount = items.filter(it => it.quantity <= it.reorderLevel).length;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col min-h-[640px]">
      {/* Simulation Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
            IM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">Inventory Management System</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">FIFO Ledger Prototype</span>
            </div>
            <p className="text-xs text-slate-400">Multi-Warehouse Asset & Supply Chain Simulation</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('items')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'items' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            Stock Items
          </button>
          <button
            onClick={() => setActiveTab('stockin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'stockin' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownRight className="w-3.5 h-3.5" />
            Stock In
          </button>
          <button
            onClick={() => setActiveTab('stockout')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'stockout' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            Stock Out
          </button>
          <button
            onClick={() => setActiveTab('transfer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'transfer' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Transfer
          </button>
          <button
            onClick={() => setActiveTab('bincard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'bincard' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Bin Cards
          </button>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-950/80 border-b border-slate-800 text-xs px-6 py-3 gap-4">
        <div>
          <span className="text-slate-400">Total SKUs:</span>{' '}
          <span className="font-mono font-semibold text-white">{items.length} Items</span>
        </div>
        <div>
          <span className="text-slate-400">Total Stock Value:</span>{' '}
          <span className="font-mono font-semibold text-cyan-400">${totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div>
          <span className="text-slate-400">Low Stock Alerts:</span>{' '}
          <span className={`font-mono font-semibold ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {lowStockCount} Items
          </span>
        </div>
        <div>
          <span className="text-slate-400">Valuation:</span>{' '}
          <span className="font-mono font-semibold text-slate-200">FIFO Strict Protocol</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 bg-slate-900/60 overflow-y-auto">
        {/* STOCK ITEMS TAB */}
        {activeTab === 'items' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by SKU, product name..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Networking">Networking</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Sensors">Sensors</option>
                  <option value="Power">Power</option>
                </select>
              </div>

              <button
                onClick={() => {
                  const newSku: InventoryItem = {
                    id: `item-${Date.now()}`,
                    sku: `SKU-GEN-${Math.floor(Math.random() * 899 + 100)}`,
                    name: 'Optic Fiber Transceiver 10Gbps SFP+',
                    category: 'Networking',
                    quantity: 45,
                    unit: 'Units',
                    costPerUnit: 85.0,
                    supplier: 'Addis Cable Corp',
                    reorderLevel: 20,
                    warehouseLocation: 'Aisle 1 / Shelf B-01'
                  };
                  setItems([...items, newSku]);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Item Sample
              </button>
            </div>

            {/* Table */}
            <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase font-mono tracking-wider text-[11px]">
                    <tr>
                      <th className="px-4 py-3">SKU</th>
                      <th className="px-4 py-3">Item Description</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Qty on Hand</th>
                      <th className="px-4 py-3">Unit Cost</th>
                      <th className="px-4 py-3">Total Value</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-cyan-400 font-semibold">{item.sku}</td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-[11px] text-slate-500">Supplier: {item.supplier}</div>
                        </td>
                        <td className="px-4 py-3">{item.category}</td>
                        <td className="px-4 py-3 text-slate-400">{item.warehouseLocation}</td>
                        <td className="px-4 py-3 font-mono tabular-nums text-slate-200">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-4 py-3 font-mono tabular-nums text-slate-400">${item.costPerUnit.toFixed(2)}</td>
                        <td className="px-4 py-3 font-mono tabular-nums text-slate-200">${(item.quantity * item.costPerUnit).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          {item.quantity <= item.reorderLevel ? (
                            <span className="inline-flex items-center gap-1 text-amber-400 font-medium">
                              <AlertTriangle className="w-3 h-3" />
                              Reorder Low
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-medium">Optimal</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* STOCK IN TAB */}
        {activeTab === 'stockin' && (
          <div className="max-w-xl mx-auto bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-4">
            <h4 className="font-semibold text-white text-sm">Goods Received Note (Stock In Entry)</h4>
            <p className="text-xs text-slate-400">Record inbound consignments and automatically increment FIFO ledger.</p>

            <form onSubmit={handleStockIn} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Target SKU Item</label>
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-200"
                >
                  {items.map(it => (
                    <option key={it.id} value={it.sku}>{it.sku} - {it.name} (Current: {it.quantity})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Received Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={transQuantity}
                  onChange={(e) => setTransQuantity(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">GRN Reference / Delivery Note</label>
                <input
                  type="text"
                  placeholder="e.g. GRN-2026-9901"
                  value={transReference}
                  onChange={(e) => setTransReference(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="Inspection notes or batch reference"
                  value={transNote}
                  onChange={(e) => setTransNote(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium transition-colors"
              >
                Log Stock In Transaction
              </button>
            </form>
          </div>
        )}

        {/* STOCK OUT TAB */}
        {activeTab === 'stockout' && (
          <div className="max-w-xl mx-auto bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-4">
            <h4 className="font-semibold text-white text-sm">Goods Dispatch / Material Issue (Stock Out)</h4>
            <p className="text-xs text-slate-400">Issue items from warehouse and calculate oldest FIFO cost basis.</p>

            <form onSubmit={handleStockOut} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Target SKU Item</label>
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-200"
                >
                  {items.map(it => (
                    <option key={it.id} value={it.sku}>{it.sku} - {it.name} (Current: {it.quantity})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Issue Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={transQuantity}
                  onChange={(e) => setTransQuantity(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Requisition or Dispatch ID</label>
                <input
                  type="text"
                  placeholder="e.g. REQ-CLIENT-742"
                  value={transReference}
                  onChange={(e) => setTransReference(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium transition-colors"
              >
                Confirm Stock Out Dispatch
              </button>
            </form>
          </div>
        )}

        {/* TRANSFER TAB */}
        {activeTab === 'transfer' && (
          <div className="max-w-xl mx-auto bg-slate-950 p-6 rounded-lg border border-slate-800 space-y-4">
            <h4 className="font-semibold text-white text-sm">Inter-Facility Item Transfer</h4>
            <p className="text-xs text-slate-400">Transfer inventory between central warehouse and regional distribution nodes.</p>

            <form onSubmit={handleTransfer} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Source Item (Central Addis Ababa)</label>
                <select
                  value={selectedSku}
                  onChange={(e) => setSelectedSku(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-200"
                >
                  {items.map(it => (
                    <option key={it.id} value={it.sku}>{it.sku} - {it.name} ({it.quantity} on hand)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Destination Facility</label>
                <select
                  value={transferTarget}
                  onChange={(e) => setTransferTarget(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-200"
                >
                  <option value="Secondary Warehouse Hawassa">Secondary Warehouse Hawassa</option>
                  <option value="Regional Depot Dire Dawa">Regional Depot Dire Dawa</option>
                  <option value="Northern Hub Bahir Dar">Northern Hub Bahir Dar</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Transfer Units</label>
                <input
                  type="number"
                  min="1"
                  value={transQuantity}
                  onChange={(e) => setTransQuantity(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium transition-colors"
              >
                Execute Inter-Warehouse Transfer
              </button>
            </form>
          </div>
        )}

        {/* BIN CARDS TAB */}
        {activeTab === 'bincard' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white text-sm">Bin Card Audit Ledger</h4>
                <p className="text-xs text-slate-400">Sequential movements, balances, and reference tokens.</p>
              </div>
            </div>

            <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase font-mono tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Movement</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Balance After</th>
                    <th className="px-4 py-3">Reference / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {records.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-slate-400">{rec.date}</td>
                      <td className="px-4 py-3 font-mono text-cyan-400 font-medium">{rec.sku}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded ${
                          rec.action === 'STOCK_IN' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          rec.action === 'STOCK_OUT' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          rec.action === 'TRANSFER' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                          'bg-purple-950 text-purple-400 border border-purple-800'
                        }`}>
                          {rec.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums">
                        {rec.action === 'STOCK_IN' || rec.action === 'RETURN' ? `+${rec.quantity}` : `-${rec.quantity}`}
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums font-bold text-white">{rec.balance}</td>
                      <td className="px-4 py-3 text-slate-400">
                        <div className="text-white font-mono text-[11px]">{rec.reference}</div>
                        <div>{rec.note}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
