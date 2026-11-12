import React, { useState } from 'react';
import { Users, Building2, Calendar, Clock, DollarSign, UserCheck, CheckCircle2, XCircle, Search, Plus, Filter, Download } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Probation';
  salary: number;
  joinDate: string;
}

const SAMPLE_EMPLOYEES: Employee[] = [
  { id: 'EMP-001', name: 'Almaz Tadesse', role: 'Senior Lead Architect', department: 'Engineering', email: 'almaz.t@demo.ethiore.com', status: 'Active', salary: 48000, joinDate: '2023-01-15' },
  { id: 'EMP-002', name: 'Dawit Bekele', role: 'DevOps Specialist', department: 'Operations', email: 'dawit.b@demo.ethiore.com', status: 'Active', salary: 38500, joinDate: '2023-04-10' },
  { id: 'EMP-003', name: 'Bethlehem Haile', role: 'HR Operations Lead', department: 'Human Resources', email: 'beth.h@demo.ethiore.com', status: 'Active', salary: 32000, joinDate: '2022-09-01' },
  { id: 'EMP-004', name: 'Yohannes Assefa', role: 'Product Designer', department: 'Product & UX', email: 'yohannes.a@demo.ethiore.com', status: 'On Leave', salary: 34000, joinDate: '2024-02-12' },
  { id: 'EMP-005', name: 'Selamawit Kebede', role: 'Financial Analyst', department: 'Finance', email: 'selam.k@demo.ethiore.com', status: 'Active', salary: 29500, joinDate: '2023-11-05' },
  { id: 'EMP-006', name: 'Henok Girma', role: 'Backend Engineer', department: 'Engineering', email: 'henok.g@demo.ethiore.com', status: 'Probation', salary: 26000, joinDate: '2026-01-08' }
];

interface LeaveRequest {
  id: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

export const HRMSPrototype: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'employees' | 'departments' | 'leave' | 'attendance' | 'payroll' | 'selfservice'>('employees');
  const [employees, setEmployees] = useState<Employee[]>(SAMPLE_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  
  // Leave state
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 'LR-101', employeeName: 'Yohannes Assefa', type: 'Annual Leave', startDate: '2026-03-10', endDate: '2026-03-14', days: 5, status: 'Approved', reason: 'Family vacation' },
    { id: 'LR-102', employeeName: 'Almaz Tadesse', type: 'Conference / Training', startDate: '2026-03-20', endDate: '2026-03-22', days: 3, status: 'Pending', reason: 'Tech leadership symposium' },
    { id: 'LR-103', employeeName: 'Henok Girma', type: 'Sick Leave', startDate: '2026-03-02', endDate: '2026-03-03', days: 2, status: 'Approved', reason: 'Medical recovery' }
  ]);
  const [newLeaveReason, setNewLeaveReason] = useState('');

  // Attendance punch simulation state
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchLog, setPunchLog] = useState<{ time: string; type: 'IN' | 'OUT' }[]>([
    { time: '08:45 AM', type: 'IN' }
  ]);

  // Selected employee for payroll slip
  const [selectedPayrollEmp, setSelectedPayrollEmp] = useState<Employee>(SAMPLE_EMPLOYEES[0]);

  // Handle punch clock
  const handlePunchToggle = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const nextState = !isPunchedIn;
    setIsPunchedIn(nextState);
    setPunchLog([{ time: timeStr, type: nextState ? 'IN' : 'OUT' }, ...punchLog]);
  };

  // Leave approval
  const handleLeaveDecision = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  // Submit leave
  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeaveReason.trim()) return;
    const newReq: LeaveRequest = {
      id: `LR-${100 + leaveRequests.length + 1}`,
      employeeName: 'Almaz Tadesse (Self)',
      type: 'Personal Time Off',
      startDate: '2026-03-25',
      endDate: '2026-03-27',
      days: 3,
      status: 'Pending',
      reason: newLeaveReason
    };
    setLeaveRequests([newReq, ...leaveRequests]);
    setNewLeaveReason('');
  };

  // Add dummy employee
  const handleAddEmployee = () => {
    const names = ['Kidus Solomon', 'Meron Tesfaye', 'Natnael Demissie', 'Rahel Mengistu'];
    const depts = ['Engineering', 'Operations', 'Finance', 'Product & UX'];
    const chosenName = names[Math.floor(Math.random() * names.length)];
    const chosenDept = depts[Math.floor(Math.random() * depts.length)];
    const newEmp: Employee = {
      id: `EMP-00${employees.length + 1}`,
      name: chosenName,
      role: 'Software Consultant',
      department: chosenDept,
      email: `${chosenName.toLowerCase().replace(' ', '.')}@demo.ethiore.com`,
      status: 'Active',
      salary: 31000,
      joinDate: new Date().toISOString().split('T')[0]
    };
    setEmployees([newEmp, ...employees]);
  };

  const filteredEmployees = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = selectedDept === 'All' || e.department === selectedDept;
    return matchSearch && matchDept;
  });

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col min-h-[640px]">
      {/* Simulation Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
            EH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-base">Ethiore HRMS</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">Demo Prototype</span>
            </div>
            <p className="text-xs text-slate-400">Enterprise HR & Payroll Simulation Workspace</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('employees')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'employees' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Employees
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'departments' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Departments
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'leave' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Leave
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'attendance' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'payroll' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Payroll Slip
          </button>
          <button
            onClick={() => setActiveTab('selfservice')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              activeTab === 'selfservice' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Self-Service
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-6 flex-1 bg-slate-900/60 overflow-y-auto">
        {/* EMPLOYEES TAB */}
        {activeTab === 'employees' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[260px]">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search employee name or role..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Filter className="w-3.5 h-3.5" />
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="All">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Product & UX">Product & UX</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleAddEmployee}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Demo Employee
              </button>
            </div>

            {/* Table */}
            <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase font-mono tracking-wider text-[11px]">
                    <tr>
                      <th className="px-4 py-3">Employee</th>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Base Salary</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{emp.name}</div>
                          <div className="text-[11px] text-slate-500">{emp.email}</div>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-400">{emp.id}</td>
                        <td className="px-4 py-3">{emp.department}</td>
                        <td className="px-4 py-3">{emp.role}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center text-[11px] font-medium ${
                            emp.status === 'Active' ? 'text-emerald-400' : emp.status === 'On Leave' ? 'text-amber-400' : 'text-slate-400'
                          }`}>
                            {emp.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono tabular-nums text-slate-200">
                          {emp.salary.toLocaleString()} ETB
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedPayrollEmp(emp);
                              setActiveTab('payroll');
                            }}
                            className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline text-[11px]"
                          >
                            Generate Slip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* DEPARTMENTS TAB */}
        {activeTab === 'departments' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">Department structures, head count distribution, and hierarchy lines.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Engineering', lead: 'Almaz Tadesse', count: 18, budget: '1,450,000 ETB' },
                { name: 'Operations', lead: 'Dawit Bekele', count: 12, budget: '920,000 ETB' },
                { name: 'Human Resources', lead: 'Bethlehem Haile', count: 5, budget: '350,000 ETB' },
                { name: 'Product & UX', lead: 'Yohannes Assefa', count: 8, budget: '680,000 ETB' },
                { name: 'Finance', lead: 'Selamawit Kebede', count: 6, budget: '510,000 ETB' },
                { name: 'Executive Leadership', lead: 'General Management', count: 4, budget: '800,000 ETB' }
              ].map((dept, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm">{dept.name}</h4>
                    <span className="text-xs text-cyan-400 font-mono tabular-nums">{dept.count} members</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>Lead: <span className="text-slate-200">{dept.lead}</span></div>
                    <div>Allocated Monthly: <span className="text-slate-200 font-mono">{dept.budget}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEAVE MANAGEMENT TAB */}
        {activeTab === 'leave' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Active Leave Requests</div>
                <div className="text-xl font-bold text-white mt-1 font-mono">{leaveRequests.length}</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Approved This Month</div>
                <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                  {leaveRequests.filter(r => r.status === 'Approved').length}
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Awaiting HR Review</div>
                <div className="text-xl font-bold text-amber-400 mt-1 font-mono">
                  {leaveRequests.filter(r => r.status === 'Pending').length}
                </div>
              </div>
            </div>

            {/* Requests List */}
            <div className="bg-slate-950 rounded-lg border border-slate-800 p-4">
              <h4 className="font-semibold text-white text-sm mb-3">Leave Approval Workflow</h4>
              <div className="space-y-3">
                {leaveRequests.map((req) => (
                  <div key={req.id} className="p-3 bg-slate-900 rounded-md border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white text-xs">{req.employeeName}</span>
                        <span className="text-[11px] text-slate-400">· {req.type}</span>
                        <span className="text-[11px] font-mono text-cyan-400">({req.days} days)</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{req.reason} (Dates: {req.startDate} to {req.endDate})</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        req.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        req.status === 'Rejected' ? 'bg-red-950 text-red-400 border border-red-800' :
                        'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {req.status}
                      </span>
                      {req.status === 'Pending' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleLeaveDecision(req.id, 'Approved')}
                            className="p-1 text-emerald-400 hover:bg-emerald-950 rounded"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleLeaveDecision(req.id, 'Rejected')}
                            className="p-1 text-red-400 hover:bg-red-950 rounded"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ATTENDANCE TAB */}
        {activeTab === 'attendance' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Punch Simulator Card */}
              <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm mb-1">Simulated Biometric / QR Timeclock</h4>
                  <p className="text-xs text-slate-400 mb-4">Simulate punching in/out as an employee to record verified timestamp logs.</p>
                  
                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center space-y-2 mb-4">
                    <div className="text-xs text-slate-400">Current Status</div>
                    <div className={`text-lg font-bold ${isPunchedIn ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {isPunchedIn ? '● Punched In (Working)' : '○ Punched Out'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePunchToggle}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isPunchedIn 
                      ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                >
                  {isPunchedIn ? 'Clock Out (End Work Shift)' : 'Clock In (Begin Work Shift)'}
                </button>
              </div>

              {/* Punch Log */}
              <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
                <h4 className="font-semibold text-white text-sm mb-3">Today\'s Punch Log</h4>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {punchLog.map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-900 rounded border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${log.type === 'IN' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span className="font-medium text-slate-200">Action: CLOCK {log.type}</span>
                      </div>
                      <span className="font-mono text-slate-400">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAYROLL SLIP TAB */}
        {activeTab === 'payroll' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white text-sm">Monthly Payroll Slip Demonstration</h4>
                <p className="text-xs text-slate-400">Standard tax bracket and pension calculations for demo staff.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Select Employee:</span>
                <select
                  value={selectedPayrollEmp.id}
                  onChange={(e) => {
                    const found = employees.find(emp => emp.id === e.target.value);
                    if (found) setSelectedPayrollEmp(found);
                  }}
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200"
                >
                  {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.name} ({e.department})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Slip Paper Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 max-w-2xl mx-auto space-y-4">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-base">Ethiore HRMS — Payslip</h3>
                  <p className="text-xs text-slate-400">Period: March 2026 · Confidential Demo Record</p>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-400">Employee ID: </span>
                  <span className="font-mono text-cyan-400">{selectedPayrollEmp.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Name:</span> <span className="text-white font-medium">{selectedPayrollEmp.name}</span>
                </div>
                <div>
                  <span className="text-slate-400">Department:</span> <span className="text-white font-medium">{selectedPayrollEmp.department}</span>
                </div>
                <div>
                  <span className="text-slate-400">Designation:</span> <span className="text-white font-medium">{selectedPayrollEmp.role}</span>
                </div>
                <div>
                  <span className="text-slate-400">Pay Date:</span> <span className="text-white font-medium">2026-03-30</span>
                </div>
              </div>

              {/* Earnings & Deductions Table */}
              <div className="border border-slate-800 rounded overflow-hidden text-xs">
                <div className="grid grid-cols-2 bg-slate-900 border-b border-slate-800 font-semibold p-2 text-slate-300">
                  <div>Earnings (ETB)</div>
                  <div>Deductions (ETB)</div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-slate-800 p-3 gap-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Base Salary</span>
                      <span className="font-mono text-white">{selectedPayrollEmp.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Transport Allowance</span>
                      <span className="font-mono text-white">2,400</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Communication Stipend</span>
                      <span className="font-mono text-white">1,200</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pl-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Income Tax (Est.)</span>
                      <span className="font-mono text-red-400">-{Math.round(selectedPayrollEmp.salary * 0.18).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pension (7%)</span>
                      <span className="font-mono text-red-400">-{Math.round(selectedPayrollEmp.salary * 0.07).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/80 border-t border-slate-800 p-3 flex justify-between items-center text-sm font-semibold">
                  <span className="text-white">Net Take-Home Pay:</span>
                  <span className="font-mono text-cyan-400 text-base">
                    {(selectedPayrollEmp.salary + 3600 - Math.round(selectedPayrollEmp.salary * 0.25)).toLocaleString()} ETB
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert('Simulated action: Payslip PDF generated successfully in memory.')}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-800/80 px-3 py-1.5 rounded hover:bg-cyan-950/40 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Demo Payslip (PDF)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SELF-SERVICE TAB */}
        {activeTab === 'selfservice' && (
          <div className="space-y-5 max-w-2xl mx-auto">
            <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
              <h4 className="font-semibold text-white text-sm mb-1">Employee Self-Service Portal</h4>
              <p className="text-xs text-slate-400 mb-4">Request time off or update internal contact information.</p>

              <form onSubmit={handleApplyLeave} className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Reason for Leave Request</label>
                  <input
                    type="text"
                    value={newLeaveReason}
                    onChange={(e) => setNewLeaveReason(e.target.value)}
                    placeholder="e.g., Medical appointment or annual family leave"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold transition-colors"
                >
                  Submit Leave Request
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
