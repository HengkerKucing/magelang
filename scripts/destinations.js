// Destinations data
const destinations = [
  {
    id: 1,
    name: "Air Terjun Sekar Langit",
    description:
      "Air terjun indah di lereng Gunung Telomoyo yang terkenal dengan legenda Jaka Tarub dan panorama alam yang asri",
    image: "/placeholder.svg?height=300&width=400",
    category: "Air Terjun",
    location: "Telomoyo, Magelang",
    rating: 4.5,
    features: ["Trekking", "Fotografi", "Piknik", "Air Segar"],
    coordinates: [-7.4672, 110.2571],
    fullDescription:
      "Air Terjun Sekar Langit merupakan salah satu destinasi wisata alam yang menawan di Magelang. Terletak di lereng Gunung Telomoyo, air terjun ini menawarkan keindahan alam yang masih asri dengan suara gemericik air yang menenangkan. Legenda Jaka Tarub yang terkenal menambah daya tarik mistis dari tempat ini. Pengunjung dapat menikmati trekking ringan menuju lokasi air terjun sambil menikmati pemandangan hutan yang hijau dan udara yang sejuk.",
  },
  {
    id: 2,
    name: "Gunung Andong",
    description:
      "Gunung kecil yang ramah pendaki pemula dengan pemandangan 360 derajat yang menakjubkan dari puncaknya",
    image: "/placeholder.svg?height=300&width=400",
    category: "Gunung",
    location: "Ngablak, Magelang",
    rating: 4.7,
    features: ["Hiking", "Sunrise", "Camping", "Pemandangan"],
    coordinates: [-7.4172, 110.3571],
    fullDescription:
      "Gunung Andong adalah destinasi hiking yang sempurna untuk pendaki pemula. Dengan ketinggian 1.726 mdpl, gunung ini menawarkan jalur pendakian yang tidak terlalu sulit namun tetap menantang. Dari puncaknya, pengunjung dapat menikmati pemandangan 360 derajat yang spektakuler, termasuk view Gunung Merapi, Merbabu, dan Sumbing. Sunrise dari puncak Gunung Andong adalah salah satu yang terindah di Jawa Tengah.",
  },
  {
    id: 3,
    name: "Nepal Van Java",
    description:
      "Desa wisata di kaki Gunung Sumbing yang unik dengan rumah-rumah warna-warni menyerupai desa di pegunungan Nepal",
    image: "/placeholder.svg?height=300&width=400",
    category: "Desa Wisata",
    location: "Candirejo, Magelang",
    rating: 4.3,
    features: ["Fotografi", "Budaya", "Kuliner", "Homestay"],
    coordinates: [-7.5172, 110.1571],
    fullDescription:
      "Nepal Van Java adalah desa wisata yang unik dengan konsep rumah-rumah berwarna-warni yang menyerupai desa di pegunungan Nepal. Terletak di kaki Gunung Sumbing, desa ini menawarkan pengalaman wisata yang berbeda dengan suasana pegunungan yang sejuk dan pemandangan yang menawan. Pengunjung dapat menginap di homestay, menikmati kuliner lokal, dan berinteraksi dengan masyarakat setempat.",
  },
  {
    id: 4,
    name: "Curug Silawe",
    description: "Air terjun megah setinggi 50 meter di lereng Gunung Sumbing dengan suasana sejuk dan alami",
    image: "/placeholder.svg?height=300&width=400",
    category: "Air Terjun",
    location: "Sumbing, Magelang",
    rating: 4.6,
    features: ["Trekking", "Fotografi", "Berenang", "Alam"],
    coordinates: [-7.3672, 110.1071],
    fullDescription:
      "Curug Silawe adalah air terjun yang menakjubkan dengan ketinggian sekitar 50 meter. Terletak di lereng Gunung Sumbing, air terjun ini menawarkan keindahan alam yang masih sangat alami. Perjalanan menuju Curug Silawe memerlukan trekking sekitar 30 menit melalui hutan yang rimbun. Air terjun ini memiliki kolam alami di bawahnya yang cocok untuk berendam dan menyegarkan diri.",
  },
  {
    id: 5,
    name: "Telaga Bleder",
    description: "Danau alami di Magelang yang tenang, cocok untuk bersantai sambil menikmati pemandangan pegunungan",
    image: "/placeholder.svg?height=300&width=400",
    category: "Danau",
    location: "Bleder, Magelang",
    rating: 4.2,
    features: ["Perahu", "Memancing", "Piknik", "Relaksasi"],
    coordinates: [-7.4172, 110.2071],
    fullDescription:
      "Telaga Bleder adalah danau alami yang menawarkan ketenangan dan kedamaian. Dikelilingi oleh perbukitan hijau, danau ini menjadi tempat yang sempurna untuk bersantai dan melepas penat. Pengunjung dapat menyewa perahu untuk berkeliling danau, memancing, atau sekadar duduk-duduk menikmati pemandangan. Suasana yang tenang dan udara yang sejuk membuat Telaga Bleder menjadi destinasi favorit untuk relaksasi.",
  },
  {
    id: 6,
    name: "Punthuk Setumbu",
    description:
      "Bukit di Magelang yang menawarkan pemandangan sunrise indah dengan latar Candi Borobudur dan Gunung Merapi",
    image: "/placeholder.svg?height=300&width=400",
    category: "Bukit",
    location: "Borobudur, Magelang",
    rating: 4.8,
    features: ["Sunrise", "Fotografi", "Borobudur View", "Hiking"],
    coordinates: [-7.6072, 110.2171],
    fullDescription:
      "Punthuk Setumbu adalah salah satu spot terbaik untuk menikmati sunrise dengan latar belakang Candi Borobudur dan Gunung Merapi. Bukit ini menjadi sangat populer di kalangan fotografer dan wisatawan yang ingin mengabadikan momen sunrise yang spektakuler. Perjalanan menuju puncak memerlukan hiking ringan sekitar 15-20 menit. Pemandangan dari atas bukit ini benar-benar memukau, terutama saat pagi hari ketika kabut tipis menyelimuti area sekitar Borobudur.",
  },
  {
    id: 7,
    name: "Hutan Pinus Kragilan",
    description: "Wisata alam yang menawarkan udara segar dan spot foto Instagramable di tengah rimbunnya pohon pinus",
    image: "/placeholder.svg?height=300&width=400",
    category: "Hutan",
    location: "Kragilan, Magelang",
    rating: 4.4,
    features: ["Fotografi", "Piknik", "Udara Segar", "Camping"],
    coordinates: [-7.4572, 110.2871],
    fullDescription:
      "Hutan Pinus Kragilan adalah destinasi wisata alam yang menawarkan suasana hutan pinus yang asri dan menenangkan. Dengan deretan pohon pinus yang tinggi dan rapi, tempat ini menjadi spot favorit untuk fotografi dan piknik keluarga. Udara yang sejuk dan segar membuat pengunjung betah berlama-lama di sini. Tersedia juga area camping bagi yang ingin merasakan pengalaman bermalam di tengah hutan pinus.",
  },
  {
    id: 8,
    name: "Gunung Merbabu",
    description: "Gunung favorit para pendaki dengan jalur hijau dan pemandangan spektakuler dari puncaknya",
    image: "/placeholder.svg?height=300&width=400",
    category: "Gunung",
    location: "Selo, Magelang",
    rating: 4.9,
    features: ["Hiking", "Camping", "Sunrise", "Edelweiss"],
    coordinates: [-7.455, 110.443],
    fullDescription:
      "Gunung Merbabu adalah salah satu gunung favorit para pendaki di Jawa Tengah. Dengan ketinggian 3.145 mdpl, gunung ini menawarkan jalur pendakian yang menantang namun sangat memuaskan. Keunikan Gunung Merbabu terletak pada jalur pendakiannya yang hijau dengan padang rumput luas di beberapa pos. Dari puncaknya, pendaki dapat menikmati pemandangan yang luar biasa indah, termasuk view Gunung Merapi, Lawu, dan kota-kota di sekitarnya. Bunga edelweiss yang tumbuh di lereng gunung menambah daya tarik tersendiri.",
  },
  {
    id: 9,
    name: "Air Terjun Sekumpul",
    description: "Air terjun yang menawan dengan ketinggian 80 meter, dikelilingi hutan tropis yang asri.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Air Terjun",
    location: "Sekumpul, Magelang",
    rating: 4.6,
    features: ["Trekking", "Fotografi", "Berenang", "Alam"],
    coordinates: [-7.3672, 110.1071],
    fullDescription:
      "Air Terjun Sekumpul adalah salah satu air terjun tertinggi di Magelang dengan ketinggian mencapai 80 meter. Dikelilingi oleh hutan tropis yang masih asri, air terjun ini menawarkan pengalaman yang menyegarkan bagi para pengunjung. Perjalanan menuju lokasi memerlukan trekking melalui jalur yang menantang namun pemandangan yang disajikan sangat memuaskan.",
  },
  {
    id: 10,
    name: "Gunung Tidar",
    description: "Gunung kecil yang menawarkan panorama kota Magelang dan sekitarnya dari ketinggian.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Gunung",
    location: "Tidar, Magelang",
    rating: 4.2,
    features: ["Hiking", "Panorama", "Sejarah", "Mudah"],
    coordinates: [-7.4672, 110.2171],
    fullDescription:
      "Gunung Tidar adalah gunung kecil yang terletak di pusat kota Magelang. Meskipun tidak tinggi, gunung ini menawarkan panorama yang indah dari kota Magelang dan daerah sekitarnya. Pendakian yang relatif mudah membuatnya cocok untuk pemula dan keluarga.",
  },
]

let displayedDestinations = 6

function createDestinationCard(destination) {
  return `
        <div class="destination-card" onclick="openDestinationModal(${destination.id})">
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.name}" loading="lazy">
                <div class="badge badge-${destination.category.toLowerCase().replace(" ", "-")}">${destination.category}</div>
            </div>
            <div class="destination-content">
                <h3 class="destination-title">${destination.name}</h3>
                <p class="destination-description">${destination.description}</p>
                <div class="destination-meta">
                    <span class="location">📍 ${destination.location}</span>
                    <span class="rating">⭐ ${destination.rating}</span>
                </div>
            </div>
        </div>
    `
}

function loadDestinations() {
  const grid = document.getElementById("destinations-grid")
  const destinationsToShow = destinations.slice(0, displayedDestinations)

  grid.innerHTML = destinationsToShow.map(createDestinationCard).join("")
  
  // Add fade-in animation to all cards
  const cards = grid.querySelectorAll('.destination-card')
  cards.forEach((card, index) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
    card.style.transition = 'all 0.6s ease-out'
    
    setTimeout(() => {
      card.style.opacity = '1'
      card.style.transform = 'translateY(0)'
    }, index * 100 + 50)
  })
}

function loadMoreDestinations() {
  const previousCount = displayedDestinations
  displayedDestinations = Math.min(displayedDestinations + 3, destinations.length)
  
  const grid = document.getElementById("destinations-grid")
  const destinationsToShow = destinations.slice(0, displayedDestinations)
  grid.innerHTML = destinationsToShow.map(createDestinationCard).join("")
  
  // Add fade-in animation only to new cards
  const cards = grid.querySelectorAll('.destination-card')
  cards.forEach((card, index) => {
    if (index < previousCount) {
      // Existing cards - no animation needed
      card.style.opacity = '1'
      card.style.transform = 'translateY(0)'
    } else {
      // New cards - add animation
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      card.style.transition = 'all 0.6s ease-out'
      
      setTimeout(() => {
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, (index - previousCount) * 150 + 100)
    }
  })

  if (displayedDestinations >= destinations.length) {
    const button = document.querySelector('button[onclick="loadMoreDestinations()"]')
    button.style.display = "none"
  }
}

function openDestinationModal(id) {
  const destination = destinations.find((d) => d.id === id)
  if (!destination) return

  const modalContent = `
        <div class="destination-modal-header">
            <div class="destination-modal-image">
                <img src="${destination.image}" alt="${destination.name}">
            </div>
            <div class="destination-modal-info">
                <h2 class="destination-modal-title">${destination.name}</h2>
                <div class="destination-modal-meta">
                    <div class="meta-item">
                        <span>📍</span>
                        <span>${destination.location}</span>
                    </div>
                    <div class="meta-item">
                        <span>⭐</span>
                        <span>${destination.rating}</span>
                    </div>
                    <div class="meta-item">
                        <span>🏷️</span>
                        <span>${destination.category}</span>
                    </div>
                </div>
                <p class="destination-modal-description">${destination.fullDescription}</p>
            </div>
        </div>
        <div class="destination-modal-features">
            <h4>Aktivitas & Fasilitas</h4>
            <div class="features-list">
                ${destination.features
                  .map(
                    (feature) => `
                    <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <span>${feature}</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `

  document.getElementById("destinationModalContent").innerHTML = modalContent
  document.getElementById("destinationModal").style.display = "block"
}

function closeDestinationModal() {
  document.getElementById("destinationModal").style.display = "none"
}

// Initialize destinations on page load
document.addEventListener("DOMContentLoaded", loadDestinations)

// Make destinations available globally
window.destinations = destinations
