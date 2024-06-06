const express = require("express");
const cors = require("cors");

// TODO: Import Service Routes Data Inventaris
const getInventaris = require("./routes/inventaris/get");
const postInventaris = require("./routes/inventaris/post");
const patchInventaris = require("./routes/inventaris/patch");
const deleteInventaris = require("./routes/inventaris/delete");

// TODO: Import Service Routes Data Pelanggan
const getPelanggan = require("./routes/pelanggan/get");
const postPelanggan = require("./routes/pelanggan/post");
const patchPelanggan = require("./routes/pelanggan/patch");
const deletePelanggan = require("./routes/pelanggan/delete");

// TODO: Import Service Routes Data Laporan
const getLaporanPenjualan = require("./routes/laporanPenjualan/get");
const postLaporanPenjualan = require("./routes/laporanPenjualan/post");
const patchLaporanPenjualan = require("./routes/laporanPenjualan/patch");
const deleteLaporanPenjualan = require("./routes/laporanPenjualan/delete");

const server = express();

server.use(cors());
server.use(express.json());

// TODO: Routes Data Inventaris
server.use("/api/inventaris", getInventaris);
server.use("/api/inventaris", postInventaris);
server.use("/api/inventaris", patchInventaris);
server.use("/api/inventaris", deleteInventaris);

// TODO: Routes Data Pelanggan
server.use("/api/pelanggan", getPelanggan);
server.use("/api/pelanggan", postPelanggan);
server.use("/api/pelanggan", patchPelanggan);
server.use("/api/pelanggan", deletePelanggan);

// TODO: Routes Data Laporan Penjualan
server.use("/api/laporanPenjualan", getLaporanPenjualan);
server.use("/api/laporanPenjualan", postLaporanPenjualan);
server.use("/api/laporanPenjualan", patchLaporanPenjualan);
server.use("/api/laporanPenjualan", deleteLaporanPenjualan);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
