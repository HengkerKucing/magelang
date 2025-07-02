// Map initialization and configuration
let map
let markerClusters
const L = window.L // Declare L variable

// Tourist attractions data for map
const touristAttractions = [
  {
    name: "Air Terjun Sekar Langit",
    type: "waterfall",
    coordinates: [-7.4672, 110.2571],
    description: "Air terjun indah di lereng Gunung Telomoyo",
  },
  {
    name: "Gunung Andong",
    type: "mountain",
    coordinates: [-7.4172, 110.3571],
    description: "Gunung ramah pendaki pemula",
  },
  {
    name: "Nepal Van Java",
    type: "tourist",
    coordinates: [-7.5172, 110.1571],
    description: "Desa wisata dengan rumah warna-warni",
  },
  {
    name: "Curug Silawe",
    type: "waterfall",
    coordinates: [-7.3672, 110.1071],
    description: "Air terjun setinggi 50 meter",
  },
  {
    name: "Telaga Bleder",
    type: "tourist",
    coordinates: [-7.4172, 110.2071],
    description: "Danau alami yang tenang",
  },
  {
    name: "Punthuk Setumbu",
    type: "tourist",
    coordinates: [-7.6072, 110.2171],
    description: "Spot sunrise terbaik dengan view Borobudur",
  },
  {
    name: "Hutan Pinus Kragilan",
    type: "tourist",
    coordinates: [-7.4572, 110.2871],
    description: "Hutan pinus untuk fotografi",
  },
  {
    name: "Gunung Merbabu",
    type: "mountain",
    coordinates: [-7.455, 110.443],
    description: "Gunung favorit para pendaki",
  },
]

// const destinations = [
//   // Example destinations data
//   { id: 1, name: "Air Terjun Sekar Langit" },
//   { id: 2, name: "Gunung Andong" },
//   { id: 3, name: "Nepal Van Java" },
//   { id: 4, name: "Curug Silawe" },
//   { id: 5, name: "Telaga Bleder" },
//   { id: 6, name: "Punthuk Setumbu" },
//   { id: 7, name: "Hutan Pinus Kragilan" },
//   { id: 8, name: "Gunung Merbabu" },
// ]

function openDestinationModal(id) {
  // Example implementation for opening a destination modal
  console.log(`Opening modal for destination with ID: ${id}`)
}

function initializeMap() {
  // Hide loading indicator when map loads
  const hideLoading = () => {
    const loadingEl = document.getElementById("mapLoading")
    if (loadingEl) {
      loadingEl.style.display = "none"
    }
  }

  // Check if map container exists
  const mapContainer = document.getElementById("map")
  if (!mapContainer) {
    console.error("Map container not found")
    return
  }

  try {
    // Create map centered on Magelang
    map = L.map("map", {
      center: [-7.467241769266182, 110.25710938521335],
      zoom: 11,
      zoomControl: true,
    })

    // Hide loading when map is ready
    map.whenReady(() => {
      hideLoading()
    })

    // Add base layers with proper error handling
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })

    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
      },
    )

    const terrainLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
      },
    )

    // Add default layer and handle loading
    osmLayer.addTo(map)

    // Layer control
    const baseLayers = {
      OpenStreetMap: osmLayer,
      Satelit: satelliteLayer,
      Terrain: terrainLayer,
    }

    L.control.layers(baseLayers).addTo(map)

    // Initialize marker clusters
    markerClusters = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 15,
    })

    // Add tourist attractions markers
    addTouristAttractions()

    // Add custom controls
    addMapTitle()
    addWatermark()

    // Force map to refresh after a short delay
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    // Make map available globally
    window.map = map
  } catch (error) {
    console.error("Error initializing map:", error)
    // Hide loading indicator even if map fails to load
    const loadingEl = document.getElementById("mapLoading")
    if (loadingEl) {
      loadingEl.innerHTML = '<p style="color: #666;">Peta tidak dapat dimuat. Silakan refresh halaman.</p>'
    }
  }
}

function addTouristAttractions() {
  touristAttractions.forEach((attraction) => {
    const icon = getMarkerIcon(attraction.type)

    const marker = L.marker(attraction.coordinates, { icon }).bindPopup(`
                <div class="map-popup">
                    <h4>${attraction.name}</h4>
                    <p>${attraction.description}</p>
                    <button class="btn btn-primary btn-sm" onclick="showAttractionDetails('${attraction.name}')">
                        Lihat Detail
                    </button>
                </div>
            `)

    markerClusters.addLayer(marker)
  })

  map.addLayer(markerClusters)
}

function getMarkerIcon(type) {
  const iconColors = {
    tourist: "#4caf50",
    mountain: "#2196f3",
    waterfall: "#ff9800",
  }

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${iconColors[type] || "#4caf50"}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

function addMapTitle() {
  const titleControl = L.control({ position: "topright" })
  titleControl.onAdd = () => {
    const div = L.DomUtil.create("div", "map-title-control")
    div.innerHTML = `
            <div style="background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h4 style="margin: 0; color: #333;">Peta Wisata Magelang</h4>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Sebaran Objek Wisata</p>
            </div>
        `
    return div
  }
  titleControl.addTo(map)
}

function addWatermark() {
  const watermarkControl = L.control({ position: "bottomleft" })
  watermarkControl.onAdd = () => {
    const div = L.DomUtil.create("div", "map-watermark")
    div.innerHTML = `
            <div style="background: rgba(255,255,255,0.8); padding: 5px; border-radius: 4px;">
                <img src="/placeholder.svg?height=40&width=40" alt="Logo" style="height: 30px; opacity: 0.7;">
            </div>
        `
    return div
  }
  watermarkControl.addTo(map)
}

function showAttractionDetails(name) {
  const destination = window.destinations.find((d) => d.name === name)
  if (destination) {
    openDestinationModal(destination.id)
  }
}

// Initialize map when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait for the map section to be visible
  const mapSection = document.getElementById("peta")
  if (mapSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !map) {
          setTimeout(initializeMap, 200)
          observer.unobserve(entry.target)
        }
      })
    })
    observer.observe(mapSection)
  } else {
    // Fallback: initialize immediately
    setTimeout(initializeMap, 500)
  }
})
