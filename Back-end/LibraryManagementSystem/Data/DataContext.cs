﻿using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Book> Books => Set<Book>();
    }
}
