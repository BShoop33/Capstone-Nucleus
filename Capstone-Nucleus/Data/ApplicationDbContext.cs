using Capstone_Nucleus.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Capstone_Nucleus.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Item> Item { get; set; }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<UserType> UserType { get; set; }

        public DbSet<Department> Department { get; set; }

        //public override EntityEntry<TEntity> Update<TEntity>(TEntity entity)
        //{
        //    if (entity == null)
        //    {
        //        throw new System.ArgumentNullException(nameof(entity));
        //    }
        //    try
        //    {
        //        return base.Update(entity);
        //    }
        //    catch (System.InvalidOperationException)
        //    {
        //        var originalEntity = Find(entity.GetType(), ((IEntity)entity).Id);
        //        Entry(originalEntity).CurrentValues.SetValues(entity);
        //        return Entry((TEntity)originalEntity);
        //    }
        //}
    }
}