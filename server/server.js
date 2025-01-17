const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // File untuk koneksi database
const path = require('path'); // Untuk mengatur folder views

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Untuk menangani form
app.use(bodyParser.json()); // Untuk menangani data JSON

// Set EJS sebagai templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set folder views

// API: Menampilkan semua produk dalam format JSON
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    res.json(results);
  });
});

// Admin Dashboard: Menampilkan semua produk
app.get('/admin', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching admin dashboard:', err);
      return res.status(500).send('Error fetching admin dashboard');
    }
    res.render('admin', { products: results });
  });
});

// Menampilkan halaman form tambah produk
app.get('/admin/add', (req, res) => {
  res.render('add-product');
});

// Menambahkan produk baru
app.post('/admin/add', (req, res) => {
  const { name, description, price, category, image_url } = req.body;
  db.query(
    'INSERT INTO products (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, category, image_url],
    (err) => {
      if (err) {
        console.error('Error adding product:', err);
        return res.status(500).send('Error adding product');
      }
      res.redirect('/admin'); // Redirect ke halaman admin setelah menambah produk
    }
  );
});

// Menampilkan form untuk mengedit produk
app.get('/admin/edit/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).send('Error fetching product');
    }
    res.render('edit-product', { product: results[0] });
  });
});

// Mengupdate produk
app.post('/admin/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image_url } = req.body;
  db.query(
    'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image_url = ? WHERE id = ?',
    [name, description, price, category, image_url, id],
    (err) => {
      if (err) {
        console.error('Error updating product:', err);
        return res.status(500).send('Error updating product');
      }
      res.redirect('/admin'); // Redirect ke halaman admin setelah mengedit produk
    }
  );
});

// Menghapus produk
app.get('/admin/delete/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).send('Error deleting product');
    }
    res.redirect('/admin'); // Redirect ke halaman admin setelah menghapus produk
  });
});

// Menjalankan server pada port 5000
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
