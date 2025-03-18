DROP DATABASE IF EXISTS rental_management;
CREATE DATABASE rental_management;

\c rental_management;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK (role IN ('owner', 'tenant', 'admin')) DEFAULT 'tenant',
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    property_type TEXT CHECK (property_type IN ('apartment', 'house', 'commercial')) DEFAULT 'apartment',
    status TEXT CHECK (status IN ('available', 'occupied', 'maintenance')) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    unit_number VARCHAR(10) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    rent_amount DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('available', 'occupied')) DEFAULT 'available',
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE leases (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL,
    property_id INTEGER NOT NULL,
    unit_id INTEGER, -- Optional for multi-unit properties
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    monthly_rent DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('active', 'terminated', 'pending')) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE SET NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    lease_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
    payment_method TEXT CHECK (payment_method IN ('bank_transfer', 'credit_card', 'cash')),
    transaction_id TEXT, -- For third-party tracking (e.g., Stripe)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lease_id) REFERENCES leases(id) ON DELETE CASCADE
);


CREATE TABLE maintenance_requests (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL,
    tenant_id INTEGER,
    description TEXT NOT NULL,
    status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    lease_id INTEGER NOT NULL,
    amount_due DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status TEXT CHECK (status IN ('unpaid', 'paid', 'overdue')) DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lease_id) REFERENCES leases(id) ON DELETE CASCADE
);


CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    lease_id INTEGER,
    property_id INTEGER,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lease_id) REFERENCES leases(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);







