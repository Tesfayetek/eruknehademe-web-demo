import React, { useState } from 'react';
import { Home, Wallet, Activity, User, Bell, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2, ChevronRight, Smartphone } from 'lucide-react';

export const MobilePrototype: React.FC = () => {
  const [mobileTab, setMobileTab] = useState<'home' | 'accounts' | 'activity' | 'profile'>('home');
  const [isRegistered, setIsRegistered] = useState(true);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [balance, setBalance] = useState<number>(48750.80);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState('250.00');
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Quick transfer simulation
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(transferAmount);
    if (!isNaN(val) && val > 0 && val <= balance) {
      setBalance(prev => prev - val);
      setTransferSuccess(true);
      setTimeout(() => {
        setTransferSuccess(false);
        setShowTransferModal(false);
      }, 1500);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col items-center justify-center p-6 min-h-[640px]">
      <div className="w-full max-w-sm mb-3 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5 font-mono text-cyan-400">
          <Smartphone className="w-4 h-4" />
          <span>390 × 844 Mobile Device Viewport</span>
        </div>
        <button
          onClick={() => setIsRegistered(!isRegistered)}
          className="text-cyan-400 hover:underline text-[11px]"
        >
          {isRegistered ? 'Switch to Registration Flow' : 'Switch to Logged In Dashboard'}
        </button>
      </div>

      {/* Simulated Smartphone Shell */}
      <div className="w-full max-w-[360px] h-[680px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col relative">
        {/* Dynamic Island / Notch */}
        <div className="h-7 bg-slate-950 flex items-center justify-between px-6 pt-1 select-none shrink-0 z-20">
          <span className="text-[11px] font-semibold text-slate-200">9:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-700 mr-2" />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/80" />
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-200 font-mono">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Mobile Viewport Screen */}
        <div className="flex-1 bg-slate-900 overflow-y-auto flex flex-col relative text-xs">
          {!isRegistered ? (
            /* USER REGISTRATION FLOW */
            <div className="p-6 flex-1 flex flex-col justify-center space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 mx-auto flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  AF
                </div>
                <h3 className="text-base font-bold text-white pt-2">Create Aura Mobile Account</h3>
                <p className="text-[11px] text-slate-400">Join 240,000+ members building financial freedom.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (regName && regEmail) setIsRegistered(true);
                }}
                className="space-y-3 pt-2"
              >
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Full Legal Name</label>
                  <input
                    required
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Alex Thompson"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Secure Passcode</label>
                  <input
                    required
                    type="password"
                    defaultValue="123456"
                    placeholder="6-digit passcode"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-md transition-all hover:opacity-90 mt-2"
                >
                  Complete Registration
                </button>
              </form>

              <p className="text-[10px] text-slate-500 text-center">
                Simulated enrollment sandbox · Zero real identity submission
              </p>
            </div>
          ) : (
            /* AUTHENTICATED MOBILE SCREENS */
            <div className="flex-1 flex flex-col justify-between">
              {/* HOME SCREEN */}
              {mobileTab === 'home' && (
                <div className="p-4 space-y-4">
                  {/* Top Bar inside app */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-400 text-xs">
                        AT
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Welcome Back,</div>
                        <div className="font-semibold text-white text-xs">{regName || 'Alex Thompson'}</div>
                      </div>
                    </div>
                    <button className="p-2 bg-slate-950 rounded-full border border-slate-800 text-slate-300">
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-2xl p-4 text-white shadow-lg space-y-3">
                    <div className="flex justify-between items-center text-[11px] opacity-90">
                      <span>Total Balance</span>
                      <span className="font-mono text-[10px] bg-white/20 px-1.5 py-0.5 rounded">USD Checking</span>
                    </div>
                    <div className="text-2xl font-bold font-mono tracking-tight">
                      ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setShowTransferModal(true)}
                        className="flex-1 py-1.5 bg-white text-slate-950 rounded-lg font-semibold text-xs flex items-center justify-center gap-1 hover:bg-slate-100 transition-colors"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-blue-700" />
                        Send Funds
                      </button>
                      <button
                        onClick={() => setBalance(prev => prev + 500)}
                        className="flex-1 py-1.5 bg-black/30 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-1 hover:bg-black/40 transition-colors"
                      >
                        <ArrowDownLeft className="w-3.5 h-3.5 text-cyan-300" />
                        Quick Deposit
                      </button>
                    </div>
                  </div>

                  {/* Recent Transactions List */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white text-xs">Recent Movements</span>
                      <span className="text-[10px] text-cyan-400">See All</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: 'Cloud Infrastructure Subscription', time: 'Today 11:20 AM', amount: -64.00, cat: 'SaaS' },
                        { title: 'Inbound Wire · Ethio Telecom', time: 'Yesterday', amount: +2850.00, cat: 'Invoice' },
                        { title: 'Addis Coffee Roastery', time: 'Mar 08', amount: -12.50, cat: 'Retail' }
                      ].map((t, i) => (
                        <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white text-[11px]">{t.title}</div>
                            <div className="text-[10px] text-slate-500">{t.time}</div>
                          </div>
                          <div className={`font-mono font-semibold text-[11px] ${t.amount > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {t.amount > 0 ? `+$${t.amount.toFixed(2)}` : `-$${Math.abs(t.amount).toFixed(2)}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ACCOUNTS SCREEN */}
              {mobileTab === 'accounts' && (
                <div className="p-4 space-y-3">
                  <h4 className="font-bold text-white text-sm">Linked Accounts</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Primary Savings</span>
                        <span className="text-emerald-400 font-mono">4.2% APY</span>
                      </div>
                      <div className="text-lg font-bold font-mono text-white mt-1">$32,400.00</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Corporate Card ·· 9821</span>
                        <span className="text-cyan-400 font-mono">Active</span>
                      </div>
                      <div className="text-lg font-bold font-mono text-white mt-1">$2,140.50 Available</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTIVITY SCREEN */}
              {mobileTab === 'activity' && (
                <div className="p-4 space-y-3">
                  <h4 className="font-bold text-white text-sm">Monthly Analytics</h4>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2">
                    <div className="text-xs text-slate-400">Cash Flow Efficiency</div>
                    <div className="text-2xl font-bold font-mono text-cyan-400">+18.4%</div>
                    <p className="text-[10px] text-slate-500">Expenditure remained 12% below budget limits.</p>
                  </div>
                </div>
              )}

              {/* PROFILE SCREEN */}
              {mobileTab === 'profile' && (
                <div className="p-4 space-y-3">
                  <div className="text-center py-2 space-y-1">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/20 border-2 border-cyan-400 mx-auto flex items-center justify-center font-bold text-cyan-300 text-base">
                      AT
                    </div>
                    <div className="font-bold text-white text-xs">{regName || 'Alex Thompson'}</div>
                    <div className="text-[10px] text-slate-400">alex@mobile-demo.com</div>
                  </div>

                  <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60 text-[11px]">
                      <span className="flex items-center gap-2 text-slate-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        Biometric Security
                      </span>
                      <span className="text-emerald-400 font-semibold">Enabled</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 text-[11px]">
                      <span className="text-slate-300">App Version</span>
                      <span className="font-mono text-slate-400">v2.4.0 (Demo)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Transfer Modal Overlay */}
          {showTransferModal && (
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-30 p-5 flex flex-col justify-center">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <h4 className="font-bold text-white text-xs">Simulated Rapid Transfer</h4>
                {transferSuccess ? (
                  <div className="text-center py-4 space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <div className="text-xs font-semibold text-white">Transfer Simulated!</div>
                    <div className="text-[10px] text-slate-400">${transferAmount} sent to recipient.</div>
                  </div>
                ) : (
                  <form onSubmit={handleTransfer} className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Transfer Amount (USD)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowTransferModal(false)}
                        className="flex-1 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-xs"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Dock */}
        {isRegistered && (
          <div className="h-16 bg-slate-950 border-t border-slate-800/80 px-4 flex items-center justify-around select-none shrink-0 z-20">
            <button
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center gap-0.5 ${mobileTab === 'home' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px]">Home</span>
            </button>
            <button
              onClick={() => setMobileTab('accounts')}
              className={`flex flex-col items-center gap-0.5 ${mobileTab === 'accounts' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Wallet className="w-4 h-4" />
              <span className="text-[9px]">Accounts</span>
            </button>
            <button
              onClick={() => setMobileTab('activity')}
              className={`flex flex-col items-center gap-0.5 ${mobileTab === 'activity' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Activity className="w-4 h-4" />
              <span className="text-[9px]">Activity</span>
            </button>
            <button
              onClick={() => setMobileTab('profile')}
              className={`flex flex-col items-center gap-0.5 ${mobileTab === 'profile' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <User className="w-4 h-4" />
              <span className="text-[9px]">Profile</span>
            </button>
          </div>
        )}

        {/* Home Indicator bar */}
        <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0">
          <div className="w-28 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};
