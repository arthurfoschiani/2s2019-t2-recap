﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Senai.Quiron.WebApi.Domains
{
    public partial class QuironContext : DbContext
    {
        public QuironContext()
        {
        }

        public QuironContext(DbContextOptions<QuironContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Doutores> Doutores { get; set; }
        public virtual DbSet<Pacientes> Pacientes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress; Initial Catalog=M_Quiron;User Id=sa;Pwd=132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doutores>(entity =>
            {
                entity.HasKey(e => e.IdDoutor);

                entity.HasIndex(e => e.Crm)
                    .HasName("UQ__Doutores__C1FF83F7D1D21238")
                    .IsUnique();

                entity.Property(e => e.Crm)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.CrmUf)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Pacientes>(entity =>
            {
                entity.HasKey(e => e.IdPaciente);

                entity.HasIndex(e => e.Cpf)
                    .HasName("UQ__Paciente__C1FF9309AB570DD3")
                    .IsUnique();

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DataNascimento).HasColumnType("date");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdDoutorNavigation)
                    .WithMany(p => p.Pacientes)
                    .HasForeignKey(d => d.IdDoutor)
                    .HasConstraintName("FK__Pacientes__IdDou__5165187F");
            });
        }
    }
}
