let map
let markerClusters
let geojsonLayers = {}
const L = window.L

const layerStyles = {
  bataskabupaten: {
    color: '#e74c3c',
    weight: 3,
    opacity: 0.8,
    fillColor: '#e74c3c',
    fillOpacity: 0.1
  },
  bataskecamatan: {
    color: '#3498db',
    weight: 2,
    opacity: 0.7,
    fillColor: '#3498db',
    fillOpacity: 0.05
  },
  batastanjungmas: {
    color: '#9b59b6',
    weight: 2,
    opacity: 0.8,
    fillColor: '#9b59b6',
    fillOpacity: 0.1
  },
  batasrwbaru: {
    color: '#f39c12',
    weight: 1.5,
    opacity: 0.6,
    fillColor: '#f39c12',
    fillOpacity: 0.05
  },
  jalan: {
    color: '#34495e',
    weight: 2,
    opacity: 0.8
  },
  jalankabupaten: {
    color: '#2c3e50',
    weight: 1.5,
    opacity: 0.7
  },
  jalantanjungmas: {
    color: '#16a085',
    weight: 1,
    opacity: 0.6
  }
}

function initializeMap() {
  const hideLoading = () => {
    const loadingEl = document.getElementById("mapLoading")
    if (loadingEl) {
      loadingEl.style.display = "none"
    }
  }

  const mapContainer = document.getElementById("map")
  if (!mapContainer) {
    console.error("Map container not found")
    return
  }

  try {
    map = L.map("map").setView([-7.467241769266182, 110.25710938521335], 12)

    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })

    const googleStreets = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      subdomains: ['mt0','mt1','mt2','mt3'],
      maxZoom: 20,
      attribution: 'Google Streets'
    })

    const googleSatellite = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      subdomains: ['mt0','mt1','mt2','mt3'],
      maxZoom: 20,
      attribution: 'Google Satellite'
    }).addTo(map)

    window.baseLayers = {
      'Open Street Map': osmLayer,
      'Google Streets': googleStreets,
      'Google Satellite': googleSatellite
    }
    
    window.overlayLayers = {}

    markerClusters = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 15
    })

    window.layerControl = L.control.layers(window.baseLayers, window.overlayLayers, {
      position: 'topright',
      collapsed: false
    }).addTo(map)

    loadWisataLayer()
    loadBatasKecamatanLayer()
    loadJalanLayer()
    addMapTitle()
    addWatermark()

    map.whenReady(() => {
      hideLoading()
    })

    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    window.map = map
  } catch (error) {
    console.error("Error initializing map:", error)
    const loadingEl = document.getElementById("mapLoading")
    if (loadingEl) {
      loadingEl.innerHTML = '<p style="color: #666;">Peta tidak dapat dimuat. Silakan refresh halaman.</p>'
    }
  }
}

function loadWisataLayer() {
  const sebaranwisata = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
      let iconColor = '#4caf50'
      let iconSymbol = '📍'
      
      const name = feature.properties.Name?.toLowerCase() || ''
      
      if (name.includes('gunung')) {
        iconColor = '#2196f3'
        iconSymbol = '🏔️'
      } else if (name.includes('air terjun') || name.includes('curug')) {
        iconColor = '#ff9800'
        iconSymbol = '💧'
      } else if (name.includes('hutan') || name.includes('pinus')) {
        iconColor = '#4caf50'
        iconSymbol = '🌲'
      } else if (name.includes('telaga') || name.includes('danau')) {
        iconColor = '#00bcd4'
        iconSymbol = '🏞️'
      }

      return L.marker(latlng, { 
        icon: L.divIcon({
          className: "custom-marker",
          html: `<div style="background-color: ${iconColor}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 16px;">${iconSymbol}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })
      })
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        const content = `
          <div class="map-popup">
            <h4>${feature.properties.Name}</h4>
            <p><strong>Alamat:</strong> ${feature.properties.Alamat}</p>
            <button class="btn btn-primary btn-sm" onclick="showAttractionDetails('${feature.properties.Name}')">
              Lihat Detail
            </button>
          </div>`
        
        layer.bindPopup(content, {
          maxWidth: 300,
          className: 'custom-popup'
        })
        
        layer.on('popupopen', function() {
          map.eachLayer(function(mapLayer) {
            if (mapLayer !== layer && mapLayer.isPopupOpen && mapLayer.isPopupOpen()) {
              mapLayer.closePopup()
            }
          })
        })
      }
    }
  })

  console.log("Loading wisata data...")
  
  fetch('data/wisata.geojson')
    .then(response => {
      console.log("Wisata response status:", response.status)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      console.log("Wisata data received:", data)
      sebaranwisata.addData(data)
      markerClusters.addLayer(sebaranwisata)
      map.addLayer(markerClusters)
      
      window.overlayLayers['🏞️ Wisata Alam'] = markerClusters
      updateLayerControl()
      
      console.log("Wisata markers added to map")
  })
    .catch(error => {
      console.error("Error loading wisata data:", error)
      const fallbackData = {
        "type": "FeatureCollection", 
        "features": [
          {"type": "Feature", "properties": {"Name": "Gunung Andong", "Alamat": "Desa Tlogorejo, Kecamatan Grabag"}, "geometry": {"type": "Point", "coordinates": [110.370287749000056, -7.389994144999946]}},
          {"type": "Feature", "properties": {"Name": "Nepal Van Java", "Alamat": "Desa Temanggung, Kecamatan Kaliangkrik"}, "geometry": {"type": "Point", "coordinates": [110.077245308000045, -7.420707030999949]}},
          {"type": "Feature", "properties": {"Name": "Air Terjun Sekar Langit", "Alamat": "Desa Tlogorejo, Kecamatan Grabag"}, "geometry": {"type": "Point", "coordinates": [110.357367326000087, -7.366800201999979]}},
          {"type": "Feature", "properties": {"Name": "Punthuk Setumbu", "Alamat": "Desa Jatimulyo, Kecamatan Dukun"}, "geometry": {"type": "Point", "coordinates": [110.177628568000046, -7.607289894999951]}},
          {"type": "Feature", "properties": {"Name": "Hutan Pinus Kragilan", "Alamat": "Desa Pogalan, Kecamatan Pakis"}, "geometry": {"type": "Point", "coordinates": [110.383949604000065, -7.46109581199994]}},
          {"type": "Feature", "properties": {"Name": "Curug Silawe", "Alamat": "Desa Sutopati, Kecamatan Kajoran"}, "geometry": {"type": "Point", "coordinates": [110.072647608000068, -7.458348745999956]}},
          {"type": "Feature", "properties": {"Name": "Telaga Bleder", "Alamat": "Desa Ngasinan, Kecamatan Grabag"}, "geometry": {"type": "Point", "coordinates": [110.346372175000056, -7.383671904999972]}},
          {"type": "Feature", "properties": {"Name": "Gunung Merbabu", "Alamat": "Desa Banyuroto, Kecamatan Sawangan"}, "geometry": {"type": "Point", "coordinates": [110.439094987000033, -7.453642024999965]}}
        ]
      }
      console.log("Using fallback wisata data - showing 8 destinations")
      sebaranwisata.addData(fallbackData)
      markerClusters.addLayer(sebaranwisata)
      map.addLayer(markerClusters)
      
      window.overlayLayers['🏞️ Wisata Alam'] = markerClusters
      updateLayerControl()
      
      if (fallbackData.features.length > 0) {
        const group = new L.featureGroup(markerClusters.getLayers())
        map.fitBounds(group.getBounds().pad(0.1))
      }
    })
}

function loadBatasKecamatanLayer() {
  const bataskecccColors = {
    "Bandongan": "#696969",
    "Borobudur": "#800000", 
    "Candimulyo": "#FFA07A",
    "Dukun": "#D2691E",
    "Grabag": "#808080",
    "Kajoran": "#FFFF00",
    "Kaliangkrik": "#000080",
    "Mertoyudan": "#00FFFF",
    "Mungkid": "#FF00FF",
    "Muntilan": "#000000",
    "Ngablak": "#A52A2A",
    "Ngluwar": "#FFD700",
    "Pakis": "#008000",
    "Salam": "#808000",
    "Salaman": "#808000",
    "Sawangan": "#800000",
    "Secang": "#800000",
    "Srumbung": "#736F6E",
    "Tegalrejo": "#E5E4E2",
    "Tempuran": "#728FCE",
    "Windusari": "#0000A0"
  }

  const bataskeccc = L.geoJson(null, {
    style: function (feature) {
      const kecamatan = feature.properties.KECAMATAN || feature.properties.bataskeccc || feature.properties.NAME
      return {
        fillColor: bataskecccColors[kecamatan] || "#CCCCCC",
        fillOpacity: 0.4,
        color: "#2c3e50",
        weight: 2, 
        opacity: 1
      }
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        const kecamatan = feature.properties.KECAMATAN || feature.properties.bataskeccc || feature.properties.NAME || 'Unknown'
        const luas = feature.properties.luas || feature.properties.LUAS || 'N/A'
        
        const content = `
          <div class="map-popup">
            <h4>Kecamatan ${kecamatan}</h4>
            <p><strong>Luas:</strong> ${luas}</p>
          </div>`
        
        layer.bindPopup(content, {
          maxWidth: 250,
          className: 'custom-popup kecamatan-popup'
        })
        
        layer.on('popupopen', function() {
          map.eachLayer(function(mapLayer) {
            if (mapLayer !== layer && mapLayer.isPopupOpen && mapLayer.isPopupOpen()) {
              mapLayer.closePopup()
            }
          })
        })
      }
    }
  })

  console.log("Loading batas kecamatan data...")
  
  fetch('data/bataskeccc.geojson')
    .then(response => {
      console.log("Kecamatan response status:", response.status)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      console.log("Kecamatan data received:", data)
      bataskeccc.addData(data)
      map.addLayer(bataskeccc)
      
      window.overlayLayers['🏘️ Batas Kecamatan'] = bataskeccc
      updateLayerControl()
      
      console.log("Batas kecamatan added to map")
    })
    .catch(error => {
      console.error("Error loading kecamatan data:", error)
      console.log("Using fallback kecamatan data - sample areas")
      
      const fallbackKecamatan = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {"KECAMATAN": "Borobudur", "luas": "5000 ha"},
            "geometry": {
              "type": "Polygon",
              "coordinates": [[
                [110.15, -7.55], [110.25, -7.55], [110.25, -7.45], [110.15, -7.45], [110.15, -7.55]
              ]]
            }
          },
          {
            "type": "Feature",
            "properties": {"KECAMATAN": "Mungkid", "luas": "4500 ha"},
            "geometry": {
              "type": "Polygon", 
              "coordinates": [[
                [110.25, -7.45], [110.35, -7.45], [110.35, -7.35], [110.25, -7.35], [110.25, -7.45]
              ]]
            }
          }
        ]
      }
      
      bataskeccc.addData(fallbackKecamatan)
      map.addLayer(bataskeccc)
      
      window.overlayLayers['🏘️ Batas Kecamatan'] = bataskeccc
      updateLayerControl()
      
      console.log("Fallback kecamatan data loaded")
    })
}

function loadJalanLayer() {
  const jalanColors = {
    "Arteri": "#FF0000",
    "Kolektor": "#0000FF", 
    "Lokal": "#008000"
  }

  const JALAN = L.geoJson(null, {
    style: function (feature) {
      const fungsi = feature.properties.FUNGSI_JAL || feature.properties.FUNGSI || 'Lokal'
      const warna = jalanColors[fungsi] || "#000000"
      return {
        color: warna,
        weight: 1.5,
        opacity: 0.6 
      }
    },
    onEachFeature: function (feature, layer) {
      layer.on({
        mouseover: function (e) {
          const layer = e.target
          layer.setStyle({
            weight: 4,
            color: "yellow",
            opacity: 1
          })
        },
        mouseout: function (e) {
          JALAN.resetStyle(e.target)
        }
      })

      if (feature.properties) {
        const namaJalan = feature.properties.NAMA_JALAN || feature.properties.NAME || 'Unknown'
        const fungsiJalan = feature.properties.FUNGSI_JAL || feature.properties.FUNGSI || 'Unknown'
        
        const content = `
          <div class="map-popup">
            <h4>🛣️ ${namaJalan}</h4>
            <p><strong>Fungsi:</strong> ${fungsiJalan}</p>
          </div>`
        
        layer.bindPopup(content, {
          maxWidth: 250,
          className: 'custom-popup jalan-popup'
        })
         
        layer.on('popupopen', function() {
          map.eachLayer(function(mapLayer) {
            if (mapLayer !== layer && mapLayer.isPopupOpen && mapLayer.isPopupOpen()) {
              mapLayer.closePopup()
            }
          })
        })
      }
    }
  })


  console.log("Loading jalan data...")
  
  fetch('data/JALAN.geojson')
    .then(response => {
      console.log("Jalan response status:", response.status)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      console.log("Jalan data received:", data)
      JALAN.addData(data)
      map.addLayer(JALAN)
      

      window.overlayLayers['🛣️ Jalan'] = JALAN
      updateLayerControl()
      
      console.log("Jalan added to map")
    })
    .catch(error => {
      console.error("Error loading jalan data:", error)
      console.log("Using fallback jalan data - main roads only")
      
      const fallbackJalan = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {"NAMA_JALAN": "Jl. Magelang-Yogya", "FUNGSI_JAL": "Arteri"},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [110.2, -7.4], [110.3, -7.45], [110.4, -7.5]
              ]
            }
          },
          {
            "type": "Feature", 
            "properties": {"NAMA_JALAN": "Jl. Magelang-Semarang", "FUNGSI_JAL": "Arteri"},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [110.25, -7.4], [110.25, -7.3], [110.25, -7.2]
              ]
            }
          }
        ]
      }
      
      JALAN.addData(fallbackJalan)
      map.addLayer(JALAN)
      
      window.overlayLayers['🛣️ Jalan'] = JALAN
      updateLayerControl()
      
      console.log("Fallback jalan data loaded")
  })
}

function addMapTitle() {
  const titleControl = L.control({ position: "topleft" })
  titleControl.onAdd = function () {
    const div = L.DomUtil.create("div", "info")
    div.innerHTML = `
            <div style="background: white; padding: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="margin: 0; color: #333; font-size: 16px;">PETA</h2>
        <p style="margin: 0; font-size: 12px; color: #666;">SEBARAN WISATA ALAM<br>KABUPATEN MAGELANG</p>
            </div>
        `
    return div
  }
  titleControl.addTo(map)
}

function addWatermark() {
  const L_Control_Watermark = L.Control.extend({
    onAdd: function() {
      const img = L.DomUtil.create('img')
      img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Lambang_Kabupaten_Magelang.png/480px-Lambang_Kabupaten_Magelang.png'
      img.style.width = '75px'
      img.style.opacity = '0.7'
      return img
    }
  })
  
  L.control.watermark = function(opts) { 
    return new L_Control_Watermark(opts) 
  }
  L.control.watermark({position:'bottomleft'}).addTo(map)
}

function showAttractionDetails(name) {
  if (window.destinations) {
    const destination = window.destinations.find((d) => d.name === name || d.name.includes(name))
  if (destination) {
      if (typeof window.openDestinationModal === 'function') {
        window.openDestinationModal(destination.id)
      }
      return
  }
  }
  
  alert(`Detail untuk ${name} akan segera tersedia.`)
}

function updateLayerControl() {
  if (window.layerControl) {
    map.removeControl(window.layerControl)
  }
  
  window.layerControl = L.control.layers(window.baseLayers, window.overlayLayers, {
    position: 'topright',
    collapsed: false
  }).addTo(map)
}

document.addEventListener("DOMContentLoaded", () => {
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
    setTimeout(initializeMap, 500)
  }
})

window.geojsonLayers = geojsonLayers
window.showAttractionDetails = showAttractionDetails
