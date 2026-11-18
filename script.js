// Langkah 1 : ambil elemen html yang akan di ambil

const bagianForm = document.getElementById("bagianForm")
const formBooking = document. getElementById("formBooking")
const bagianInvoice = document.getElementById("bagianInvoice")
const pesanError = document.getElementById("pesanError")

// ambil inputan dari form

const inputNama = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputjumlah = document.getElementById("jumlah");
const inputBerangkat = document.getElementById("berangkat");

// data paket wisata
const dataPaket = {
    "Bali Escape" : {
        durasi : "3 Hari 2 Malam",
        malam: 2,
        harga: 2450000},
    "Bromo Sunrise Trip" : {
        durasi : "2 Hari 1 Malam",
        malam: 1,
        harga: 1350000},
    "Raja Ampat Discovery" : {
        durasi : "4 Hari 3 Malam",
        malam: 3,
        harga: 5750000},
    "Labuan Bajo Explorer" : {
        durasi : "3 Hari 2 Malam",
        malam: 2,
        harga: 3950000},
}

// langkah 2 : formating
// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}


// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tanggal) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// langkah 3 : perintah saat form disubmit
// ===============================================

formBooking.addEventListener("submit", function(event){
    //cegah halaman reload (kebiasaan bawaaan form adalah reload)
    event.preventDefault();

    // ambil isi dari setiap form 
    const nama = inputNama.value;
    const paket = inputPaket.value;
    const jumlah = Number(inputjumlah.value); //ubah teks jadi angka
    const berangkat = inputBerangkat.value;

    //validasi form
    // semua pesan eror dikumpulkan di dalam array ini
    const daftarError = [];

    //mengubah string "2026-11-18" menjadi objek date javascript (waktu lokal)
    const tglBerangkat = new Date(berangkat + "T00:00:00");

    //tanggal hari ini (jamnya dibuang, sisakan tanggal saja
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);


    //1. nama : tidak boleh kosong, min 3 karakter
    if (nama == "") {
        daftarError.push("Nama pemesan wajib diisi !")
    } else if (nama.length < 3) {
        daftarError.push("Nama pemesan minimal 3 karakter !")
    }
    //push : digunakan untuk menambahkan data ke dalam array 

    // 2. paket tidak boleh kosong
    // =================================

    if (paket == "") {
      daftarError.push("Paket wajib diisi !");
    }

    // 3. jumlah orang tidak boleh kosong
    // jumlah orang < 1 ; jumlah orang minimal 1
    // jumlah orang tidak boleh > 20 ; jumlah orang maksimal 20 
    // =================================

     if (jumlah == "") {
       daftarError.push("Jumlah orang wajib diisi !");
     } else if (jumlah < 1) {
       daftarError.push("Jumlah orang minimal 1 !");
     } else if (jumlah > 20) {
       daftarError.push("Jumlah orang maksimal 20!");
     }

     //4. tangal tidak boleh kemarin
     if (berangkat == "") {
       daftarError.push("Tanggal berangkat wajib diisi !");
     } else if (tglBerangkat < hariIni) {
       daftarError.push("Tanggal berangkat tidak boleh sebelum hari ini !");
     }



    //eror ditampilkan
    if (daftarError. length > 0){
        pesanError.innerHTML = daftarError.join("<br>");
        pesanError.classList.remove("d-none");
        return; //berhenti disini, dan invoice tidak ditampilkan

        //text content: hanya membaca atau mengubah konten elemen sebagai teks biasa. tag html tidak di proses
        //inner html: membaca atau mengubah konten elemen, membaca tag html
    }

    // ambil data paket yang dipilih lalu dihitung
    const detail = dataPaket[paket];

    // total = harga per orang * jumlah orang
    const total = detail.harga * jumlah;

    //tampilkan data ke invoice
    
    document.getElementById("outNama").textContent = nama;
    document.getElementById("outPaket").textContent = paket;
    document.getElementById("outBerangkat").textContent = formatTanggal(tglBerangkat);
    document.getElementById("outPeserta").textContent = jumlah + " orang";
     document.getElementById("outDurasi").textContent = detail.durasi;
    document.getElementById("outHarga").textContent = formatRupiah(detail.harga);
    document.getElementById("outTotal").textContent = formatRupiah(total);

   

    //sembunyikan form, tamppilkan invoice
    bagianForm.classList.add("d-none");
    bagianInvoice.classList.remove("d-none");
})