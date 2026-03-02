import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  /**
   * Obtiene el cliente de Supabase para operaciones personalizadas
   */
  getClient(): SupabaseClient {
    return this.supabase;
  }

  // ==================== AUTENTICACIÓN ====================

  /**
   * Registra un nuevo usuario
   */
  async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;
    return data;
  }

  /**
   * Inicia sesión con email y contraseña
   */
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  /**
   * Cierra sesión
   */
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  /**
   * Obtiene la sesión actual
   */
  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  /**
   * Obtiene el usuario actual
   */
  async getCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  }

  /**
   * Escucha cambios en la autenticación
   */
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  /**
   * Envía email de recuperación de contraseña
   */
  async resetPassword(email: string) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza la contraseña del usuario
   */
  async updatePassword(newPassword: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza el perfil del usuario
   */
  async updateProfile(updates: any) {
    const { data, error } = await this.supabase.auth.updateUser({
      data: updates
    });

    if (error) throw error;
    return data;
  }

  // ==================== PRODUCTOS ====================

  /**
   * Obtiene todos los productos
   */
  async getProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Obtiene un producto por ID
   */
  async getProductById(id: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Crea un nuevo producto
   */
  async createProduct(product: any) {
    const { data, error } = await this.supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza un producto existente
   */
  async updateProduct(id: string, updates: any) {
    const { data, error } = await this.supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Elimina un producto
   */
  async deleteProduct(id: string) {
    const { data, error } = await this.supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ==================== PROVEEDORES ====================

  /**
   * Obtiene todos los proveedores
   */
  async getSuppliers() {
    const { data, error } = await this.supabase
      .from('suppliers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Crea un nuevo proveedor
   */
  async createSupplier(supplier: any) {
    const { data, error } = await this.supabase
      .from('suppliers')
      .insert([supplier])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza un proveedor
   */
  async updateSupplier(id: string, updates: any) {
    const { data, error } = await this.supabase
      .from('suppliers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Elimina un proveedor
   */
  async deleteSupplier(id: string) {
    const { data, error } = await this.supabase
      .from('suppliers')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ==================== UBICACIONES ====================

  /**
   * Obtiene todas las ubicaciones
   */
  async getLocations() {
    const { data, error } = await this.supabase
      .from('locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Crea una nueva ubicación
   */
  async createLocation(location: any) {
    const { data, error } = await this.supabase
      .from('locations')
      .insert([location])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza una ubicación
   */
  async updateLocation(id: string, updates: any) {
    const { data, error } = await this.supabase
      .from('locations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Elimina una ubicación
   */
  async deleteLocation(id: string) {
    const { data, error } = await this.supabase
      .from('locations')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Genera ubicaciones en masa
   */
  async generateLocations(params: any) {
    // Aquí puedes usar una función RPC de Supabase
    // o generar las ubicaciones en el frontend
    const locations = [];
    
    for (let row = params.rowMin; row <= params.rowMax; row++) {
      for (let bay = params.bayMin; bay <= params.bayMax; bay++) {
        for (let level = params.levelMin; level <= params.levelMax; level++) {
          const storageName = `${params.area}-${String(row).padStart(2, '0')}-${String(bay).padStart(2, '0')}-${String(level).padStart(2, '0')}`;
          
          locations.push({
            zone: params.zone,
            category: params.category,
            type: params.type,
            area: params.area,
            row: row,
            bay: bay,
            level: level,
            storage_name: storageName,
            active: true
          });
        }
      }
    }

    const { data, error } = await this.supabase
      .from('locations')
      .insert(locations)
      .select();

    if (error) throw error;
    return data;
  }

  // ==================== BINS ====================

  /**
   * Obtiene bins de una ubicación
   */
  async getBinsByLocation(locationId: string) {
    const { data, error } = await this.supabase
      .from('bins')
      .select('*')
      .eq('location_id', locationId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  /**
   * Crea un nuevo bin
   */
  async createBin(bin: any) {
    const { data, error } = await this.supabase
      .from('bins')
      .insert([bin])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Actualiza un bin
   */
  async updateBin(id: string, updates: any) {
    const { data, error } = await this.supabase
      .from('bins')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Elimina un bin
   */
  async deleteBin(id: string) {
    const { data, error } = await this.supabase
      .from('bins')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // ==================== CONSULTAS PERSONALIZADAS ====================

  /**
   * Ejecuta una consulta SQL personalizada (requiere función RPC en Supabase)
   */
  async executeRpc(functionName: string, params?: any) {
    const { data, error } = await this.supabase
      .rpc(functionName, params);

    if (error) throw error;
    return data;
  }

  /**
   * Realiza una búsqueda de texto completo
   */
  async searchTable(table: string, column: string, searchTerm: string) {
    const { data, error } = await this.supabase
      .from(table)
      .select('*')
      .ilike(column, `%${searchTerm}%`);

    if (error) throw error;
    return data;
  }
}
