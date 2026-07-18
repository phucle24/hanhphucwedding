import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Copy, 
  ExternalLink, 
  Trash2, 
  Search, 
  Share2, 
  Download, 
  Plus, 
  Trash, 
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react'
import { config } from '../weddingConfig'

export default function LinkGenerator() {
  const [guestText, setGuestText] = useState('')
  const [side, setSide] = useState('') // '' (both), 'trai', 'gai'
  const [prefix, setPrefix] = useState('') // custom prefix helper
  const [relationType, setRelationType] = useState('')
  const [customRelation, setCustomRelation] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [guests, setGuests] = useState([])
  const [copiedId, setCopiedId] = useState(null)
  const [copiedAll, setCopiedAll] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedGuests = localStorage.getItem('wedding_guests')
    if (savedGuests) {
      try {
        setGuests(JSON.parse(savedGuests))
      } catch (e) {
        console.error('Lỗi đọc danh sách khách mời:', e)
      }
    }
  }, [])

  // Save to localStorage when guests update
  const saveGuests = (newGuests) => {
    setGuests(newGuests)
    localStorage.setItem('wedding_guests', JSON.stringify(newGuests))
  }

  // Handle generating links from text
  const handleGenerate = (e) => {
    e.preventDefault()
    if (!guestText.trim()) return

    const names = guestText
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0)

    const finalRelation = relationType === 'custom' ? customRelation : relationType

    const newGuests = names.map(name => {
      const fullName = prefix ? `${prefix} ${name}` : name
      return {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        name: fullName,
        side: side,
        relation: finalRelation,
        createdAt: new Date().toISOString()
      }
    })

    const updatedGuests = [...newGuests, ...guests]
    saveGuests(updatedGuests)
    setGuestText('')
    setPrefix('')
    setRelationType('')
    setCustomRelation('')
  }

  // Delete guest
  const handleDelete = (id) => {
    const updatedGuests = guests.filter(g => g.id !== id)
    saveGuests(updatedGuests)
  }

  // Clear all guests
  const handleClearAll = () => {
    saveGuests([])
    setShowClearConfirm(false)
  }

  // Generate individual link
  const getGuestLink = (guest) => {
    const baseUrl = config.websiteUrl || window.location.origin
    const params = new URLSearchParams()
    params.set('g', guest.name)
    if (guest.side === 'trai') {
      params.set('s', 't')
    } else if (guest.side === 'gai') {
      params.set('s', 'g')
    }
    if (guest.relation) {
      params.set('r', guest.relation)
    }
    let queryStr = params.toString()
    // Temporarily replace %2B, %26, %3D, %23 so they don't get decoded to raw '+', '&', '=', '#'
    queryStr = queryStr
      .replace(/%2B/gi, '__PLUS__')
      .replace(/%26/gi, '__AMP__')
      .replace(/%3D/gi, '__EQUALS__')
      .replace(/%23/gi, '__HASH__')

    let decodedQuery = decodeURIComponent(queryStr)

    // Restore the encoded representation so they remain valid URL-safe characters
    decodedQuery = decodedQuery
      .replace(/__PLUS__/g, '%2B')
      .replace(/__AMP__/g, '%26')
      .replace(/__EQUALS__/g, '%3D')
      .replace(/__HASH__/g, '%23')

    return `${baseUrl}?${decodedQuery}`
  }

  // Copy individual link
  const copyLink = (guest, id) => {
    const link = getGuestLink(guest)
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      })
      .catch(err => console.error('Lỗi sao chép:', err))
  }

  // Copy all links as plain text list
  const copyAllLinks = () => {
    if (guests.length === 0) return
    const textList = guests.map(g => `${g.name}: ${getGuestLink(g)}`).join('\n')
    navigator.clipboard.writeText(textList)
      .then(() => {
        setCopiedAll(true)
        setTimeout(() => setCopiedAll(false), 2000)
      })
      .catch(err => console.error('Lỗi sao chép tất cả:', err))
  }

  // Share to Zalo helper
  const shareZalo = (guest) => {
    const link = getGuestLink(guest)
    
    // Custom pronoun logic for Zalo invitation message
    const getZaloPronoun = (name, relation) => {
      if (relation) return relation;
      const lowerName = name.toLowerCase();
      if (lowerName.startsWith('em') || lowerName.includes(' em ') || lowerName.startsWith('cháu') || lowerName.startsWith('gia đình em')) {
        return 'anh chị';
      }
      if (lowerName.startsWith('bạn') || lowerName.includes(' bạn ') || lowerName.startsWith('cậu') || lowerName.startsWith('tớ')) {
        return 'chúng mình';
      }
      return 'chúng em'; // default
    }

    const invitationMessage = `Trân trọng kính gửi ${guest.name} thiệp cưới online của ${getZaloPronoun(guest.name, guest.relation)}:\n${link}`
    
    // Copy the message to clipboard first for easy pasting
    navigator.clipboard.writeText(invitationMessage)
      .then(() => {
        // Open Zalo in new window (they can paste the message)
        window.open('https://zalo.me', '_blank')
      })
      .catch(err => console.error('Lỗi sao chép tin nhắn:', err))
  }

  // Export to CSV file
  const exportToCSV = () => {
    if (guests.length === 0) return
    // UTF-8 BOM for Excel support of Vietnamese characters
    const BOM = '\uFEFF'
    let csvContent = BOM + 'STT,Tên Khách Mời,Nhóm Tiệc,Đường Dẫn Thiệp Mời\n'
    
    guests.forEach((g, idx) => {
      const sideText = g.side === 'trai' ? 'Nhà Trai' : g.side === 'gai' ? 'Nhà Gái' : 'Cả Hai'
      const line = `${idx + 1},"${g.name.replace(/"/g, '""')}","${sideText}","${getGuestLink(g)}"`
      csvContent += line + '\n'
    })

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `danh_sach_khach_moi_cuoi_${new Date().toLocaleDateString('vi-VN')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Filter guests by search query
  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Go back to invitation page
  const goBack = () => {
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="min-h-screen bg-[#fdf6f3] text-gray-800 font-sans pb-12">
      {/* Header Bar */}
      <header className="bg-white border-b border-[#ecc1c1]/50 sticky top-0 z-40 px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={goBack}
            className="flex items-center gap-1.5 text-gray-600 hover:text-[#8b2323] transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} />
            <span>Xem Thiệp Cưới</span>
          </button>
          <h1 className="text-base md:text-lg font-serif font-bold text-[#8b2323] tracking-wide text-center">
            CÔNG CỤ TẠO LINK THIỆP MỜI
          </h1>
          <div className="w-24 text-right">
            <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded">
              Admin
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left panel: Input Form */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-[#ecc1c1]/40 shadow-md">
              <h2 className="text-sm font-serif font-bold text-[#8b2323] mb-4 border-b border-[#ecc1c1]/30 pb-2 uppercase tracking-wider">
                Thêm Khách Mời
              </h2>
              
              <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    1. Xưng Hô / Tiền Tố (Tùy chọn)
                  </label>
                  <select
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#ecc1c1] bg-[#fffbf9]"
                  >
                    <option value="">-- Không thêm tiền tố --</option>
                    <option value="Thân mời">Thân mời</option>
                    <option value="Kính mời">Kính mời</option>
                    <option value="Thân gửi">Thân gửi</option>
                    <option value="Gia đình anh">Gia đình anh</option>
                    <option value="Gia đình em">Gia đình em</option>
                    <option value="Bạn">Bạn</option>
                    <option value="Anh">Anh</option>
                    <option value="Chị">Chị</option>
                    <option value="Em">Em</option>
                  </select>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Tiền tố sẽ tự động ghép vào đầu tên (Ví dụ: "Thân mời Gia đình anh Nam")
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    2. Phân Nhóm Tiệc (Tùy chọn)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSide('')}
                      className={`text-xs py-2 rounded-xl border transition-all ${
                        side === '' 
                          ? 'bg-[#8b2323] text-white border-[#8b2323]' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Cả hai
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide('trai')}
                      className={`text-xs py-2 rounded-xl border transition-all ${
                        side === 'trai' 
                          ? 'bg-[#8b2323] text-white border-[#8b2323]' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Nhà Trai
                    </button>
                    <button
                      type="button"
                      onClick={() => setSide('gai')}
                      className={`text-xs py-2 rounded-xl border transition-all ${
                        side === 'gai' 
                          ? 'bg-[#8b2323] text-white border-[#8b2323]' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Nhà Gái
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Để làm nổi bật tiệc nhà trai hoặc nhà gái tương ứng với khách
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    3. Đại Từ Xưng Hô Của Cô Dâu &amp; Chú Rể (Tùy chọn)
                  </label>
                  <select
                    value={relationType}
                    onChange={(e) => {
                      setRelationType(e.target.value)
                      if (e.target.value !== 'custom') {
                        setCustomRelation('')
                      }
                    }}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#ecc1c1] bg-[#fffbf9]"
                  >
                    <option value="">-- Tự động nhận diện --</option>
                    <option value="chúng em">chúng em (Khi mời vai trên: anh, chị, cô, chú...)</option>
                    <option value="anh chị">anh chị (Khi mời vai dưới: em, cháu...)</option>
                    <option value="chúng mình">chúng mình (Khi mời bạn bè, cậu, tớ...)</option>
                    <option value="hai đứa">hai đứa (Khi mời bạn bè thân...)</option>
                    <option value="chúng tôi">chúng tôi (Trang trọng/Quý khách...)</option>
                    <option value="custom">Tự nhập đại từ xưng hô khác...</option>
                  </select>
                  
                  {relationType === 'custom' && (
                    <input
                      type="text"
                      value={customRelation}
                      onChange={(e) => setCustomRelation(e.target.value)}
                      placeholder="Ví dụ: cháu, con, chúng tớ..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#ecc1c1] bg-[#fffbf9] mt-2"
                      required
                    />
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">
                    Cặp đôi sẽ xưng hô là gì với khách (Ví dụ: "Dự tiệc chung vui cùng **anh chị**")
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    4. Danh Sách Tên Khách Mời
                  </label>
                  <textarea
                    rows={6}
                    value={guestText}
                    onChange={(e) => setGuestText(e.target.value)}
                    placeholder="Tính & Tuyết&#10;Anh Nam Công Ty&#10;Bạn Hoa Cấp 3&#10;..."
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#ecc1c1] bg-[#fffbf9] placeholder-gray-400"
                    required
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Nhập mỗi tên khách mời trên 1 dòng
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 bg-[#8b2323] hover:bg-[#721a1a] text-white font-semibold py-2.5 rounded-xl transition-colors shadow-md text-sm"
                >
                  <Plus size={16} />
                  <span>Tạo Link Thiệp Mời</span>
                </button>
              </form>
            </div>

            {/* Quick stats & tools */}
            <div className="bg-[#fffdfb] rounded-2xl p-4 border border-[#ecc1c1]/30 shadow-sm text-xs space-y-3">
              <h3 className="font-semibold text-gray-700">Tóm tắt danh sách</h3>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-gray-500 font-light">Tổng số khách</p>
                  <p className="text-lg font-bold text-gray-800">{guests.length}</p>
                </div>
                <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-gray-500 font-light">Lưu tại</p>
                  <p className="text-sm font-bold text-[#8b2323] mt-1">Trình duyệt</p>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <button
                  onClick={copyAllLinks}
                  disabled={guests.length === 0}
                  className="w-full flex items-center justify-center gap-1.5 border border-[#ecc1c1] text-[#8b2323] hover:bg-amber-50/50 disabled:opacity-50 py-2 rounded-xl transition-colors font-medium"
                >
                  {copiedAll ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  <span>{copiedAll ? 'Đã sao chép tất cả!' : 'Sao chép tất cả link'}</span>
                </button>
                <button
                  onClick={exportToCSV}
                  disabled={guests.length === 0}
                  className="w-full flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 py-2 rounded-xl transition-colors font-medium"
                >
                  <Download size={14} />
                  <span>Xuất file Excel (CSV)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right panel: Guests list table */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-[#ecc1c1]/40 shadow-md overflow-hidden">
              {/* Table search & action bar */}
              <div className="p-4 border-b border-[#ecc1c1]/20 flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#fffbf9]">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm khách mời..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#ecc1c1] bg-white placeholder-gray-400"
                  />
                </div>
                {guests.length > 0 && (
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    {!showClearConfirm ? (
                      <button
                        onClick={() => setShowClearConfirm(true)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 py-1.5 px-3 rounded-lg border border-red-100 hover:bg-red-50/50 transition-colors"
                      >
                        <Trash2 size={14} />
                        <span>Xóa tất cả</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 p-1.5 rounded-lg">
                        <span className="text-[10px] text-red-700 font-medium">Chắc chắn xóa?</span>
                        <button
                          onClick={handleClearAll}
                          className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded hover:bg-red-700"
                        >
                          Xóa
                        </button>
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="bg-white text-gray-600 text-[10px] px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-100"
                        >
                          Hủy
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Table container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                      <th className="px-4 py-3 text-center w-12">STT</th>
                      <th className="px-4 py-3">Tên Khách Mời</th>
                      <th className="px-4 py-3 w-24">Nhóm Tiệc</th>
                      <th className="px-4 py-3 text-center w-40">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {filteredGuests.length > 0 ? (
                        filteredGuests.map((guest, idx) => (
                          <motion.tr
                            key={guest.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="border-b border-gray-50 hover:bg-[#fefcfb] transition-colors"
                          >
                            <td className="px-4 py-3.5 text-center text-gray-400 font-light">
                              {guests.indexOf(guest) + 1}
                            </td>
                            <td className="px-4 py-3.5 font-medium text-gray-800">
                              {guest.name}
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex flex-col gap-1">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold inline-block w-fit ${
                                  guest.side === 'trai' 
                                    ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                                    : guest.side === 'gai' 
                                      ? 'bg-rose-50 text-rose-700 border border-rose-100' 
                                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                                }`}>
                                  {guest.side === 'trai' ? 'Nhà Trai' : guest.side === 'gai' ? 'Nhà Gái' : 'Cả Hai'}
                                </span>
                                {guest.relation && (
                                  <span className="text-[10px] text-gray-400 font-light">
                                    Xưng hô: {guest.relation}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* Copy button */}
                                <button
                                  onClick={() => copyLink(guest, guest.id)}
                                  title="Sao chép link thiệp"
                                  className="p-1.5 rounded-lg border border-gray-200 hover:border-[#ecc1c1] hover:bg-amber-50/20 text-gray-500 hover:text-[#8b2323] transition-colors"
                                >
                                  {copiedId === guest.id ? (
                                    <Check size={14} className="text-green-600" />
                                  ) : (
                                    <Copy size={14} />
                                  )}
                                </button>

                                {/* Zalo button */}
                                <button
                                  onClick={() => shareZalo(guest)}
                                  title="Sao chép tin nhắn Zalo & Mở Zalo"
                                  className="p-1.5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                  <Share2 size={14} />
                                </button>

                                {/* Preview button */}
                                <a
                                  href={getGuestLink(guest)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Xem thử thiệp"
                                  className="p-1.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors inline-block"
                                >
                                  <ExternalLink size={14} />
                                </a>

                                {/* Delete button */}
                                <button
                                  onClick={() => handleDelete(guest.id)}
                                  title="Xóa"
                                  className="p-1.5 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                  <Trash size={14} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-10 text-gray-400">
                            {guests.length === 0 ? (
                              <div className="space-y-2">
                                <AlertCircle className="mx-auto text-gray-300" size={32} />
                                <p>Chưa có danh sách khách mời.</p>
                                <p className="text-[10px] text-gray-400">Nhập tên bên trái và bấm tạo link nhé!</p>
                              </div>
                            ) : (
                              <p>Không tìm thấy khách mời phù hợp.</p>
                            )}
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Guide notes */}
            <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed space-y-2">
              <h4 className="font-bold font-serif text-[#8b2323]">💡 Hướng dẫn gửi thiệp cưới cá nhân hóa:</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Bấm vào nút **Copy (Sao chép)** để lấy nhanh link thiệp cưới cá nhân hóa cho khách.</li>
                <li>Bấm vào nút **Share (Zalo)**: Hệ thống sẽ tự động sao chép một tin nhắn mời cưới trang trọng và mở ứng dụng/web Zalo để bạn dán và gửi cho khách nhanh chóng.</li>
                <li>Bạn có thể xuất danh sách ra file Excel/CSV để quản lý hoặc in ấn.</li>
                <li>Dữ liệu được lưu trữ tự động trên máy tính của bạn nên bạn có thể đóng trình duyệt và quay lại làm tiếp bất cứ lúc nào!</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
